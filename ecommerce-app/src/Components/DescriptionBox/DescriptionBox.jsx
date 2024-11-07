import React from 'react';
import './Description.css';

function DescriptionBox() {
  return (
     <>
     <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi iusto possimus molestiae cumque non, maiores atque architecto dolorem quibusdam mollitia voluptatem soluta dolore dolores ad fugiat in officia cupiditate minus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus perferendis velit explicabo natus doloribus fuga, suscipit ex nam et debitis vel rem quibusdam! Quod maiores quidem eveniet unde placeat earum.
            Ullam, laborum cum? Aperiam dignissimos nam eius doloremque. Quo eius ipsa magnam fuga corporis architecto pariatur odio maxime, ea repellendus earum dolore voluptates velit quaerat saepe? Ut ducimus esse cumque.</p>
        </div>
     </div>
     </>
  )
}

export default DescriptionBox;