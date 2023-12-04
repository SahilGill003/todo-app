import { useRef } from 'react';
import IconCross from './../.././public/images/icon-cross.svg';
export default ({ id, text, status, removeItem, changeStatus }: { id: Number, text: String, status: String, removeItem: Function, changeStatus: Function, todoList: Array<any>, change: Function }) => {
  const ref = useRef(null);


  return <div className="todo-item visible" ref={ref}>
    <input type="checkbox" id={"item-" + id} className="item-checkbox" onChange={(e) => changeStatus(id, e.target.checked)} checked={status === "complete"} />
    <label className="item-text" htmlFor={"item-" + id}><p>{text}</p></label>
    <button className="icon-cross-btn" aria-label="delete item" onClick={() => {
      const tr: HTMLElement = ref.current!;
      tr.classList.remove('visible');
      setTimeout(() => removeItem(id), 375)
    }}>
      <IconCross className='icon-cross'></IconCross>
    </button>
  </div>
}