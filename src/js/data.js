import * as I from 'immutable';
import * as uuid from "uuid";


export function createFile (parent, name) {
    return I.fromJS({
        cid: uuid.v4().toString(),
        parent: parent,
        isDir: false,
        name: name || "New File",
        createdAt: (new Date()).toISOString(),
        modifiedAt: (new Date()).toISOString()
    });
}

export function createDirectory (parent, name) {
    return I.fromJS({
        cid: uuid.v4().toString(),
        parent: parent,
        isDir: true,
        name: name || "New directory",
        createdAt: (new Date()).toISOString(),
        modifiedAt: (new Date()).toISOString()
    });
}

export function fullPath (file) {
    var current = file;
    var path = (file && file.get('isDir')) ? [file] : [];
    while (current && current.get('parent')) {
        path.push(current.get('parent'));
        current = current.get('parent');
    }
    return I.fromJS(path.reverse());
}

export function deleteNodes (nodes, allNodes) {
    var transientNodes = I.Set(allNodes);
    var forDeletion = I.List(nodes);
    var children = nodes.map((node) => allNodes.filter((n) => I.is(n.get('parent'), node))).flatten(true);

    do {
        forDeletion = forDeletion.concat(children);
        children = children.map((node) => allNodes.filter((n) => I.is(n.get('parent'), node))).flatten(true);
    } while (children.count() != 0);

    I.Set(forDeletion).forEach((d) => {
        transientNodes = transientNodes.remove(d);
    });

    return transientNodes;
}