const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors');

module.exports = function (app) {
    // CORS 설정
    app.use(cors());

    // 프록시 설정
    app.use('/back', createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug'
    }));

    app.use('/api', createProxyMiddleware({
        target: 'https://tsherpa.item-factory.com',
        changeOrigin: true,
        logLevel: 'debug'
    }));

    // 이미 설정된 '/file' 경로 프록시 설정 제거
    app.use('/file', createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        logLevel: 'debug'
    }));

    // 추가적인 Express 미들웨어 설정 (CORS 설정 반복 방지)
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
};
