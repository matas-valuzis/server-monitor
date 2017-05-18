import React, {Component} from 'react';

export default class LinkList extends Component {
  onLinkClick = (e) => {
     e.preventDefault();
     let item = this.props.items.find(i => i.id == e.target.dataset.id);
     if(item && this.props.onItemClick){
       this.props.onItemClick(item);
     }
  };
  render() {
    let items = [];

    items = this.props.items.map((e, i) => {
      let selected = this.props.selectedItem == e.id ? 'active' : '';
      let oddness = i % 2 == 0 ? 'li-even' : 'li-odd';
      return (
        <li key={e.id} className="nav-item customItem">
            <a
                data-id={e.id}
                className={["nav-link customLink ", selected, oddness].join(" ")}
                onClick={this.onLinkClick}>
                {this.props.labelResolver(e)}
            </a>
        </li>
      );
    });
    return (
        <ul className={this.props.className}>
          {items}
        </ul>
    );
  }
}

LinkList.propTypes = {
  items: React.PropTypes.array.isRequired,            // each item must have id
  selectedItem: React.PropTypes.string,               // id of selected item
  labelResolver: React.PropTypes.func.isRequired,     // returns label from item
  onItemClick: React.PropTypes.func,                  // passes clicked item
  className: React.PropTypes.string                   // list class
};
