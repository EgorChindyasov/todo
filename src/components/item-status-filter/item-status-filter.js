import React from 'react'

import './item-status-filter.css'

export default class ItemStatusFilter extends React.Component {

  buttons = [
    {name: 'all', label: 'Все'},
    {name: 'active', label: 'Текущие'},
    {name: 'done', label: 'Выполненые'},
  ]

  render() {

    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      
      const isActive = filter === name 
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'

      return (
        <button 
          type="button"
          className={`btn ${clazz}`}
          onClick={() => onFilterChange(name)}
          key={name}>
            {label}
          </button>
      )
    })

    return (
      <div className="btn-group">
        {buttons}
      </div>
    )  
  }
}