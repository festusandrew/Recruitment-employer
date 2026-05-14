import { useState } from "react";
import {
    Save, Database, Mail, Shield, Bell, Palette, Globe,
    Server, Key, Lock, CheckCircle
} from "lucide-react";

export function SystemSettings() {
    const [settings, setSettings] = useState({
        platformName: "MployUs",
        supportEmail: "support@mployus.com",
        maxJobsPerCompany: "100",
        allowPublicSignup: true,
        requireEmailVerification: true,
        enableMaintenanceMode: false,
        apiRateLimit: "1000",
        sessionTimeout: "30",
        enableNotifications: true,
        enableAutoBackups: true,
    });

    const handleSave = () => {
        alert("Settings saved successfully!");
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl text-gray-900 mb-2">System Settings</h1>
                <p className="text-gray-600">Configure platform-wide system settings</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* General Settings */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Globe className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg text-gray-900">General Settings</h3>
                                <p className="text-sm text-gray-500">Basic platform configuration</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Platform Name</label>
                            <input
                                type="text"
                                value={settings.platformName}
                                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Support Email</label>
                            <input
                                type="email"
                                value={settings.supportEmail}
                                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Max Jobs Per Company</label>
                            <input
                                type="number"
                                value={settings.maxJobsPerCompany}
                                onChange={(e) => setSettings({ ...settings, maxJobsPerCompany: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg text-gray-900">Security Settings</h3>
                                <p className="text-sm text-gray-500">Manage authentication and security</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-900">Allow Public Signup</p>
                                <p className="text-xs text-gray-500 mt-1">Enable new companies to register</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, allowPublicSignup: !settings.allowPublicSignup })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.allowPublicSignup ? 'bg-[#800020]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.allowPublicSignup ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-900">Require Email Verification</p>
                                <p className="text-xs text-gray-500 mt-1">Users must verify email before access</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.requireEmailVerification ? 'bg-[#800020]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Session Timeout (minutes)</label>
                            <input
                                type="number"
                                value={settings.sessionTimeout}
                                onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* API & Performance */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Server className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-lg text-gray-900">API & Performance</h3>
                                <p className="text-sm text-gray-500">Configure API limits and performance</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                            <input
                                type="number"
                                value={settings.apiRateLimit}
                                onChange={(e) => setSettings({ ...settings, apiRateLimit: e.target.value })}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg text-gray-900">System Status</h3>
                                <p className="text-sm text-gray-500">Monitor system health</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-900">Maintenance Mode</p>
                                <p className="text-xs text-gray-500 mt-1">Block access for system maintenance</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, enableMaintenanceMode: !settings.enableMaintenanceMode })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.enableMaintenanceMode ? 'bg-[#800020]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.enableMaintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-900">Enable Auto Backups</p>
                                <p className="text-xs text-gray-500 mt-1">Automatic daily database backups</p>
                            </div>
                            <button
                                onClick={() => setSettings({ ...settings, enableAutoBackups: !settings.enableAutoBackups })}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.enableAutoBackups ? 'bg-[#800020]' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.enableAutoBackups ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-900">Database</span>
                                </div>
                                <p className="text-xs text-green-700">Healthy</p>
                            </div>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-900">API</span>
                                </div>
                                <p className="text-xs text-green-700">Running</p>
                            </div>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-900">Storage</span>
                                </div>
                                <p className="text-xs text-green-700">45% Used</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-3 pt-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-[#800020] text-white rounded-lg hover:bg-[#600018] transition-colors"
                    >
                        <Save className="w-5 h-5" />
                        Save All Settings
                    </button>
                    <button className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        Reset to Defaults
                    </button>
                </div>
            </div>
        </div>
    );
}
