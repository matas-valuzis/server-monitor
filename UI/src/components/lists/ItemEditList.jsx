import React, {Component} from 'react';

export default class ItemEditList extends Component {
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
            let selected = this.props.selectedItem == e.id ? 'selected' : '';
            let oddness = i % 2 == 0 ? 'li-even' : 'li-odd';
            const actions = this.props.actionResolver ? this.props.actionResolver(e) : [];
            const actionItems = actions.map((a) => (<div key={e.id+'_action'} className="list-item-action">{a}</div>));
            const status = this.props.statusResolver ? this.props.statusResolver(e) : '';
            return (
            <li
              data-id={e.id}
              key={e.id}
              className={["list-group-item", selected, oddness].join(" ")}
              onClick={this.onLinkClick}>
                <div  className="edit-list-item list-item-label">{this.props.labelResolver(e)}</div>
                <div  className="edit-list-item list-item-actions">{actionItems}</div>
                <div  className="edit-list-item list-item-status">{status}</div>
            </li>
            );
        });

        return (

            <ul className="list-group list-group-flush">
              {items}
            </ul>

        );
    }
}

ItemEditList.propTypes = {
  items: React.PropTypes.array.isRequired,            // each item must have id
  selectedItem: React.PropTypes.string,               // id of selected item
  labelResolver: React.PropTypes.func.isRequired,     // returns label for item
  statusResolver: React.PropTypes.func,               // returns status label from item
  actionResolver: React.PropTypes.func,               // returns array of actions for item
  onItemClick: React.PropTypes.func                   // passes clicked item
}
