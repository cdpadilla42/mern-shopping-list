import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

class ShoppingList extends Component {
  render() {
    const { items } = this.props;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item');
            const newItem = { name };
            if (name) {
              this.props.addItemBackend(newItem);
            }
          }}
        >
          Add Item
        </Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      this.props.deleteItemBackend(_id);
                    }}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ShoppingList;
