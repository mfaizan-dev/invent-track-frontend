import React from "react";

const ContextMenu = ({ x, y, options, onClose }) => {
  return (
    <div className="context-menu" style={{ left: x, top: y }} onClick={onClose}>
      {options.map((option, index) => (
        <div className="context-menu-item" key={index} onClick={option.onClick}>
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
