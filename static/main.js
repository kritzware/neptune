console.log('Neptune init')

// hljs.initHighlightingOnLoad()

// hljs.configure({ useBR: true });

// $('#cell').each(function(i, block) {
//   hljs.highlightBlock(block);
// });

// const editor = ace.edit("editor")
// editor.setTheme("ace/theme/monokai")
// editor.session.setMode("ace/mode/javascript")

// pass options to ace.edit
const editor = ace.edit('editor', {
    mode: "ace/mode/javascript",
    selectionStyle: "text"
})

// use setOptions method to set several options at once
editor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});

// some options are also available as methods e.g. 
editor.setTheme('ace/theme/dracula');

editor.commands.addCommand({
    name: 'runCell',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Command-Enter'},
    exec: function(editor) {
        const content = editor.getValue()
        postData('http://localhost:3000/build', { content })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    },
    readOnly: true // false if this command should not apply in readOnly mode
});

// postData('http://example.com/answer', {answer: 42})
//   .then(data => console.log(data)) // JSON from `response.json()` call
//   .catch(error => console.error(error))

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}