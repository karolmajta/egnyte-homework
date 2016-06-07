import * as I from 'immutable';

import * as dataUtils from './data';


function reconcileNodes (is, was) {
    let removed = was.subtract(is);
    let added = is.subtract(was);
    removed.forEach((r) => localStorage.removeItem(r.get('cid')));
    added.forEach((a) => localStorage.setItem(a.get('cid'), JSON.stringify(a.toJS())));
}

export function isPersistenceFresh () {
    return !JSON.parse(localStorage.getItem('seeded'));
}

export function reconcileAll (is, was) {
    reconcileNodes(I.Set(is.get('nodes').values()), I.Set(was.get('nodes').values()));
}

export function seed () {
    console.log('seeding...');
    let books = dataUtils.createDirectory(null, 'My Books');
    let notes = dataUtils.createDirectory(null, 'My Notes');
    let hello = dataUtils.createFile(null, 'Hello World.txt');
    let ofMiceAndMen = dataUtils.createFile(books, 'Of Mice and Men.epub');
    let grainsOfWrath = dataUtils.createFile(books, 'Grains of Wrath.epub');
    let buyMilk = dataUtils.createFile(notes, 'Buy Milk.txt');
    let workTodos = dataUtils.createFile(notes, 'Work Todos.txt');
    let allNodes = I.Set.of(books, notes, hello, ofMiceAndMen, grainsOfWrath, buyMilk, workTodos);
    reconcileNodes(allNodes, I.Set());
    localStorage.setItem('seeded', JSON.stringify(true));
}

export function getAllNodes () {
    let nodes = [];
    for (var i = 0; i<localStorage.length; i++) {
        if (localStorage.key(i) != 'seeded') {
            nodes.push(I.fromJS(JSON.parse(localStorage.getItem(localStorage.key(i)))));
        }
    }
    return I.Map(nodes.map((n) => [n.get('cid'), n]));
}