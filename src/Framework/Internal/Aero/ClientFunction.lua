local function ClientFunction(wrapper)
	assert(type(wrapper) == "function", "Something wrong when compiling rbxts")
	return {
		_isFunction = true,
		_wrappedFunction = wrapper,
		_asyncEnabled = false,
	}
end

return ClientFunction
