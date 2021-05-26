local function ClientFunctionAsync(wrapper)
	assert(type(wrapper) == "function", "Something wrong when compiling rbxts")
	return {
		_isFunction = true,
		_wrappedFunction = wrapper,
		_asyncEnabled = true,
	}
end

return ClientFunctionAsync
