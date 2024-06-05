export const saveStateToLocalStorage = async <TState>(state: TState) => {
	try {
		localStorage.setItem('state_item', JSON.stringify(state));
	} catch (error) {
		console.log(error)
	}
}

export const getStateFromLocalStorage = <TState>() => {
	try {
    const result = localStorage.getItem('state_item');
    if (!result) return undefined;
    return JSON.parse(result) as TState;
  } catch (e) {
    return undefined;
  }
}

