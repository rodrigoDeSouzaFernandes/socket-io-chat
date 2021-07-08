const socket = io()

      const button = document.querySelector('.send-comment');
      const input = document.querySelector('.chat-input');

      const sendComment = () => {
        const comment = input.value;
        socket.emit('postComment', comment)
        input.value = ''
      }

      button.addEventListener('click', sendComment)

      socket.on('broadcastComment', (comment) => {
        const ul = document.querySelector('.comments');

        const li = document.createElement('li');
        li.innerText = `${socket.id}: ${comment}`;

        ul.appendChild(li);
      });