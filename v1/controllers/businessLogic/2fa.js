function generate2FACode(_start, _end)
{
    return Math.floor(Math.random() * (_start - _end + 1) + _end)
}

module.exports = {
    generate2FACode : generate2FACode
}