local StandaloneModule = {}
StandaloneModule.__index = {}

function StandaloneModule.new(...)
	return ServerModule.constructor(setmetatable({}, StandaloneModule), ...)
end

function StandaloneModule.constructor(self, ...)
	return self
end

return StandaloneModule
