const socket = io.connect('http://192.168.0.33:6677', {'forceNew': true});

socket.on('messages',(data) => {
    console.log(data);
    render(data);
})

function render(data){
    let html = data.map((message, index)=> {
            return(`
            <div class='message'>
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    const div_msg = document.getElementById('messages');
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(e){
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('name').style.display = 'none';
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}
