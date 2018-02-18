function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    console.dir("CAPASSE");
    $('ul.tabs').tabs('select_tab', 'info');
}

