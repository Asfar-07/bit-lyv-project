import React from 'react'
import "./Header.css"

export default function Header() {
  return (
    <div className='Header'>
      <nav>
        <ul>
            <li>
                <div><i className="fa-solid fa-magnifying-glass"></i></div>
                <div><i className="fa-solid fa-bars"></i></div>
            </li>
            <li>
                <a href="/"><i className="fa-solid fa-house"></i></a>
            </li>
        </ul>
      </nav>
    </div>
  )
}
