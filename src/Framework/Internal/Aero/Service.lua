local Service = {}
Service.__index = {}

function Service.new(...)
	return Service.constructor(setmetatable({}, Service), ...)
end

function Service.constructor(self, ...)
	self._events = {}
	return self
end

return Service
