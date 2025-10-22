'use client';
import React from 'react';

export function VerifyRuntimeConfig() {
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('🔧 Runtime config:', window.RUNTIME_CONFIG);
            if (!window.RUNTIME_CONFIG?.NEXT_PUBLIC_BASE_URL) {
                console.warn('⚠️ Missing LOGIN_KEY in NEXT_PUBLIC_BASE_URL!');
            }
        }
    }, []);

    return null;
}