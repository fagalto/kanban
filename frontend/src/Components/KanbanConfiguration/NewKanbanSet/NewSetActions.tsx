const Actions = () => {
  const itemsActions = ["Highlight", "Delete", "Add"];
  return (
    <div>
      <ul>
        {itemsActions.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};
export default Actions;
