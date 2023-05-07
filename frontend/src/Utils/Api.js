class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;

    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
    
    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(this._getResponseData)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
          method: !isLiked ? 'DELETE' : 'PUT',
          credentials: 'include',
          headers: this._headers,
        })
          .then(this._getResponseData)
    
      }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._getResponseData)
    }

    // другие методы работы с API
}

const api = new Api({
    //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
    baseUrl: 'http://localhost:3001',
    headers: {
        //authorization: '29bc0e4d-0a00-420c-8af9-d39122fdc8f9',
        //'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;