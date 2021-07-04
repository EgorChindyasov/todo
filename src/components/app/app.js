import React from 'react'
import AppHeader from '../app-header/'
import SearchPanel from '../search-panel/'
import TodoList from '../todo-list/'
import ItemStatusFilter from '../item-status-filter/'
import ItemAddForm from '../item-add-form/'
import './app.css'

export default class App extends React.Component {
  constructor() {
    super()

    // id для добавления элемента
    this.Id = 4

    this.state = {
      todoData: [
        {id: 1, label: 'Выпить кофе', important: false, done: false},
        {id: 2, label: 'Пообедать', important: false, done: false},
        {id: 3, label: 'Выучить JS', important: false, done: false}
      ],
      term: '',
      filter: ''   // all, active, done
    }

    this.deleteItem = (id) => {
      this.setState( ({ todoData }) => {
        // id нажатого элемента
        const idx = todoData.findIndex(el => el.id === id)

        // массив todoData от 0 до idx
        const before = todoData.slice(0, idx)
        // массив todoData от idx+1 до конца массива
        const after = todoData.slice(idx + 1)

        return {
          // новый массив без элемента с индексом idx
          todoData: [...after, ...before]
        }
      })
    }

    this.addItem = (text) => {
      this.setState(({ todoData }) => {

        // новый объект для добавления
        const newItem = {
          id: this.Id++,
          label: text,
          important: false,
        }

        return {
          // новый массив с элементом newItem в конце
          todoData: [...todoData, newItem]
        }
      })
    }

    this.toggleProperty = (arr, id, propName) => {
      // id нажатого элемента
      const idx = arr.findIndex(el => el.id === id)

      const oldItem = arr[idx]
      const newItem = {
        ...oldItem,
        [propName]: !oldItem[propName]
      }

      const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)] 

      return newArray 
    }

    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {

        return {
          todoData: this.toggleProperty(todoData, id, 'important')
        }
      })
    }

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {

        return {
          todoData: this.toggleProperty(todoData, id, 'done')
        }
      })
    }

    this.onSearchChange = (term) => {
      this.setState({ term })
    }

    this.onFilterChange = (filter) => {
      this.setState({ filter })
    }

    this.search = (items, term) => {
      if (term.length === 0) {
        return items
      }

      return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
      })
    }
    
    this.filter = (items, filter) => {
      switch (filter) {
        case 'all':
         return items
        case 'active':
          return items.filter((item) => !item.done)
        case 'done':
          return items.filter((item) => item.done)
        default: 
          return items
      }
    }

  }

  render() {

    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(this.search(todoData, term), filter)

    const doneCount = this.state.todoData.filter(el => el.done).length
    const todoCount = this.state.todoData.length - doneCount

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
            filter={filter}
            onFilterChange={this.onFilterChange}/>
        </div>

      <ItemAddForm  onItemAdd={ this.addItem }/>

      <TodoList 
        todos={visibleItems}
        onDelete={ this.deleteItem }
        onToggleImportant={ this.onToggleImportant }
        onToggleDone={ this.onToggleDone } />
    </div>
    )
  }
}