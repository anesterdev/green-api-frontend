const addition = `PGRpdiBjbGFzcz0iY3JlZHMiPgogICAgICAgIDxwPkFsZXhhbmRlciBOZXN0ZXIgfCBEZWMgMjgsIDIwMjQgfDwvcD4KICAgICAgICA8YSBocmVmPSJodHRwczovL2dpdGh1Yi5jb20vYW5lc3RlcmNvbW1wcm9kIj5HaXRIdWI8L2E+CiAgICA8L2Rpdj4=`

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < 2; i++) {
        if (inputs[i]) {
            const ph = inputs[i].placeholder;
            inputs[i].addEventListener('keyup', (e) => {
                sessionStorage.setItem(ph, inputs[i].value);
            });
            const sti = sessionStorage.getItem(ph);
            if (sti) {
                inputs[i].value = sti;
            }
        }
    }

    const buttons = document.querySelectorAll('button[data-action]');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const action = button.getAttribute('data-action');
            let data = {};

            data.idInstance = document.getElementById('idInstance').value;
            data.apiTokenInstance = document.getElementById('apiTokenInstance').value;
            data.chatId = document.getElementById('chatIdSendFile').value;
            data.fileName = `image_${Date.now()}.png`;
            data.caption = `image_${Date.now()}.png`;

            switch (action) {
                case 'getSettings':
                case 'getStateInstance':
                    break;
                case 'sendMessage':
                    data.chatIdSendMessage = document.getElementById('chatIdSendMessage').value;
                    data.message = document.getElementById('message').value;
                    break;
                case 'sendFileByUrl':
                    data.chatIdSendFile = document.getElementById('chatIdSendFile').value;
                    data.chatId = document.getElementById('chatIdSendFile').value;
                    data.urlFile = document.getElementById('urlFile').value;
                    data.fileName = `image_${Date.now()}.png`;
                    data.caption = `image_${Date.now()}.png`;
                    break;
                default:
                    break;
            }

            fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: action, data: data })
            })
                .then(response => response.json())
                .then(responseData => {
                    document.getElementById('outputBox').innerText = JSON.stringify(responseData, null, 2);
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('outputBox').innerText = JSON.stringify({ error: 'An error occurred' }, null, 2);
                });
        });
    });

    document.body.innerHTML = document.body.innerHTML + atob(addition);
    document.querySelector('.jsWarning').remove();
});
