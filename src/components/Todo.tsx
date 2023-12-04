import './Todo.css';
import IconSun from './../../public/images/icon-sun.svg';
import IconMoon from './../../public/images/icon-moon.svg';
import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';

const TodoList = () => {
	const [todoList, setTodoList] = useState<Array<any>>([]);

	const [itemText, setItemText] = useState("");
	const [itemStatus, setItemStatus] = useState<"active" | "complete">("active");
	const [completedItems, setCompletedItems] = useState<Array<Number>>([]);
	const [currentTab, setCurrentTab] = useState<"All" | "Active" | "Completed">("All");

	useEffect(() => {
		let completedItemIds: Array<Number> = [];
		todoList.forEach(data => {
			if (data.status === 'complete')
				completedItemIds.push(data.id);
		})
		setCompletedItems(completedItemIds);
	}, [todoList]);

	const removeSingleItem = (id: Number) => {
		setTodoList(prev => prev.filter(data => data.id !== id));
	}

	const removeCompletedItems = () => {
		setTodoList(prev => (
			prev.filter(data => !completedItems.includes(data.id))
		))
	}

	const handleStatus = (id: Number, checked: Boolean) => {
		setTodoList(prev => prev.map(data => {
			if (data.id === id) {
				return { ...data, status: checked ? "complete" : "active" }
			}
			else {
				return data;
			}
		}))
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTodoList(prev => {
			let newId = 0;
			prev.forEach(data => newId = Math.max(newId, data.id));
			newId++;
			return [{ id: newId, text: itemText, status: itemStatus }, ...prev];
		})
		setItemText("");
		setItemStatus("active");
	}

	const filteredTodoList = () => {
		let newList = todoList.sort((a, b) => a.id - b.id)
		return newList.filter(data => {
			if (currentTab === "Active")
				return data.status === "active";
			else if (currentTab === "Completed")
				return data.status === "complete";
			return true;
		}
		)
	}

	return (
		<div className="todo-list">
			{/* // To create a Todo */}
			<form className="todo-create" onSubmit={(e) => handleSubmit(e)}>
				<input type="checkbox" id={"item-"} className="item-checkbox" onChange={(e) => setItemStatus(e.target.checked ? "complete" : "active")} checked={itemStatus === "complete"} />
				<label htmlFor={"item- item-input item-text"}>
					<input type="text" id="item-input" placeholder='Create a new Todo ...' value={itemText} onChange={(e) => setItemText(e.target.value)} autoComplete="off" />
				</label>
			</form>
			{/* // Items */}
			<div className="todos">
				{filteredTodoList().map(data =>
					<TodoItem key={data.id} {...data} removeItem={removeSingleItem} changeStatus={handleStatus} />
				)}
			</div>
			<div className="todo-footer">
				<p className="col-1">{todoList.length - completedItems.length} items left</p>
				<div className="todo-filter" aria-label="filter todos">
					<button className={currentTab === "All" ? "active" : ""} onClick={() => setCurrentTab('All')}>All</button>
					<button className={currentTab === "Active" ? "active" : ""} onClick={() => setCurrentTab('Active')}>Active</button>
					<button className={currentTab === "Completed" ? "active" : ""} onClick={() => setCurrentTab('Completed')}>Completed</button>
				</div>
				<p className="col-3" role="button" aria-label='clear completed items' onClick={() => removeCompletedItems()}>Clear Completed</p>
			</div>

		</div>
	);
}


export default () => {
	const [themeSwitcher, setTheme] = useState(document.documentElement.classList.contains('dark'));
	return (<div className="todo">
		<header> <p>TODO</p>
			<button className='theme-btn' aria-label="toggle theme button" onClick={() => {
				setTheme(!themeSwitcher)
				document.documentElement.classList.toggle('dark');
			}}>
				{themeSwitcher ?
					<IconSun></IconSun> : <IconMoon></IconMoon>}
			</button>

		</header>
		<TodoList></TodoList>
		<footer className="footer"><p>Drag and Drop to reorder list</p></footer>
	</div>);
}