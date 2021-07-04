import React from 'react'
import './item-add-form.css'

export default class ItemAddForm extends React.Component {
    
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({ label: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()  // чтобы страница не перезагружалась
        this.props.onItemAdd(this.state.label)
        this.setState({ label: '' })
    }

    render() {
        return (
            <form 
                className="item-add-form d-flex"
                // отправка формы
                onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    className="form-control"
                    // получение текущего значения
                    onChange={this.onLabelChange}
                    placeholder="добавить элемент"
                    value={this.state.label} />
                <button 
                    className="btn btn-outline-secondary"
                    onClick={this.onSubmit}>
                        Добавить
                </button>
            </form>
        )
    }
}