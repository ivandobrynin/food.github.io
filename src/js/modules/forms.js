function forms() {

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
   
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);


            

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // XMLHttpRequest в связке с FormData не нуждается в заголовке(setRequestHeader)
            //  В таком случае данные будут в произвольном формате
            // если нам нужно отправить данные в формате JSON, то заголовоу будет НУЖЕН

            // request.setRequestHeader('Content-type', 'multipart/form-data');

            // request.setRequestHeader('Content-type', 'aplication/json');
           


            // Создаем глобальный объект(класс) для данных
            const formData = new FormData(form);
            
            //Перебираем наши данные для соответствия ключ-значение
            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            //Аналогичный метод

            const json = JSON.stringify(Object.fromEntries(formData.entries()));



            
            // Создаем и отправляем запрос
            // куда: server.php
            // headers нужны для работы с JSON
            // body: тело нашего запроса, в который мы помещаем наш перебранный объект
            // методом JSON.stringify(объект) преобразовываем его в формат JSON


            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'aplication.json'
            //     },
            //     body: JSON.stringify(object)
            // })

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

            
            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const previosModalDialog = document.querySelector('.modal__dialog');
        previosModalDialog.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
           thanksModal.remove();
           previosModalDialog.classList.add('show');
           previosModalDialog.classList.remove('hide');
           closeModal();
        }, 4000);
    }
    
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

    //Fetch API

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name:'Alex'}),
    //     headers: {
    //         'Content-type': 'aplication/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));
}

module.exports = forms;