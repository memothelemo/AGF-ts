local Controller = {}
Controller.__index = {}

function Controller.new(...)
	return Controller.constructor(setmetatable({}, Controller), ...)
end

function Controller.constructor(self, ...)
	self._events = {}
	return self
end

return Controller
