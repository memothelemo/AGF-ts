local ClientToServer = {}
ClientToServer.__index = {}

function ClientToServer.new(...)
	return ClientToServer.constructor(setmetatable({}, ClientToServer), ...)
end

function ClientToServer.constructor(self, service)
	self.Server = service;
	return self
end

return ClientToServer
