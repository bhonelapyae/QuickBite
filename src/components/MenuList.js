
import '../styles/MenuList.css';
import MenuItemCard from './MenuItemCard';

const MenuList = ({ items = [], onDetailClick = null }) => {
  return (
    <div className="menu-list">
      <div className="menu-grid">
        {items.length > 0 ? (
          items.map(item => (
            <MenuItemCard
              key={item.id}
              menuItem={item}
              onDetailClick={onDetailClick}
            />
          ))
        ) : (
          <p className="no-items">No menu items available</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
