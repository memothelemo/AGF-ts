local function ClientEvent(name)
	assert(type(name) == "string", "Something wrong when compiling rbxts")
	return {
		_isFunction = false,
		_name = name,
	}
end

return ClientEvent
