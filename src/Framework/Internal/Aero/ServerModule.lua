local ServerModule = {}
ServerModule.__index = {}

function ServerModule.new(...)
	return ServerModule.constructor(setmetatable({}, ServerModule), ...)
end

function ServerModule.constructor(self, ...)
	return self
end

return ServerModule
