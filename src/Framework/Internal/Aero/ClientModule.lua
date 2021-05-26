local ClientModule = {}
ClientModule.__index = {}

function ClientModule.new(...)
	return ClientModule.constructor(setmetatable({}, ClientModule), ...)
end

function ClientModule.constructor(self, ...)
	return self
end

return ClientModule
