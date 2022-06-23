// to always return type string event when s may be falsy other than empty-string
export const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || ""