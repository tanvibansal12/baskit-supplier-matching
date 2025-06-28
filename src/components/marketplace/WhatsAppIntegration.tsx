import React, { useState } from 'react';
import { MessageCircle, Phone, Send, CheckCircle, Clock, AlertCircle, ExternalLink, Smartphone, Bot, Users } from 'lucide-react';
import { WhatsAppMessage } from '../../types/marketplace';

interface WhatsAppIntegrationProps {
  userPhone?: string;
  onSendMessage?: (message: string, type: 'order' | 'promo') => void;
}

export const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({ 
  userPhone = '+62812345678',
  onSendMessage 
}) => {
  const [activeTab, setActiveTab] = useState<'send' | 'automation' | 'history'>('send');
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState<'order' | 'promo'>('order');

  // Mock WhatsApp messages
  const mockMessages: WhatsAppMessage[] = [
    {
      id: '1',
      phone: '+62812345678',
      message: 'Thank you for uploading your receipt! You earned 200 loyalty points. Receipt ID: RCP-001',
      type: 'confirmation',
      status: 'delivered',
      sentAt: new Date('2024-03-15T10:30:00'),
      relatedReceiptId: '1'
    },
    {
      id: '2',
      phone: '+62823456789',
      message: 'New Ramadan campaign is live! Upload receipts for Indomie products and get 2x bonus points until April 30th.',
      type: 'promo',
      status: 'read',
      sentAt: new Date('2024-03-14T09:15:00'),
      relatedCampaignId: '1'
    },
    {
      id: '3',
      phone: '+62834567890',
      message: 'Your order for 100 cartons of Indomie Goreng has been confirmed. Delivery expected in 2-3 days.',
      type: 'order',
      status: 'delivered',
      sentAt: new Date('2024-03-13T14:20:00')
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Clock className="h-4 w-4 text-gray-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'read': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'promo': return 'bg-purple-100 text-purple-800';
      case 'confirmation': return 'bg-green-100 text-green-800';
      case 'notification': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim() && onSendMessage) {
      onSendMessage(messageText, messageType);
      setMessageText('');
    }
  };

  const generateWhatsAppLink = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  };

  // Pre-defined message templates
  const messageTemplates = {
    order: [
      "Hi! I'd like to place an order for the products listed in your marketplace. Can we discuss the details?",
      "Hello, I'm interested in your bulk pricing for the items in your current campaign. Please share more details.",
      "Good day! I'd like to participate in your current promotion. How can I get started?"
    ],
    promo: [
      "🎉 New campaign alert! Upload receipts for featured products and earn bonus points!",
      "📱 Don't miss out! Special promotion ending soon. Upload your receipts now for extra rewards.",
      "🏆 Congratulations! You're eligible for our premium distributor program. Contact us for details."
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">WhatsApp Integration</h1>
        <p className="text-gray-600">Connect with retailers and manage communications seamlessly</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('send')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'send'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            <Send className="h-5 w-5 mx-auto mb-1" />
            Send Messages
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'automation'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            <Bot className="h-5 w-5 mx-auto mb-1" />
            Automation
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-green-500 text-white'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            Message History
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'send' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick WhatsApp Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-green-500" />
                  Order via WhatsApp
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Send a pre-filled message to start an order conversation
                </p>
                <a
                  href={generateWhatsAppLink('+6281234567890', messageTemplates.order[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Order Chat
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-500" />
                  Promo Participation
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Join current promotions and campaigns
                </p>
                <a
                  href={generateWhatsAppLink('+6281234567890', 'Hi! I want to participate in your current promotion. Please share the details.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Promo
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          {/* Custom Message Composer */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Custom Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Type
                </label>
                <select
                  value={messageType}
                  onChange={(e) => setMessageType(e.target.value as 'order' | 'promo')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                >
                  <option value="order">Order Inquiry</option>
                  <option value="promo">Promotion Message</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Templates
                </label>
                <div className="space-y-2">
                  {messageTemplates[messageType].map((template, index) => (
                    <button
                      key={index}
                      onClick={() => setMessageText(template)}
                      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  placeholder="Type your custom message here..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send via WhatsApp
                </button>
                
                <a
                  href={generateWhatsAppLink('+6281234567890', messageText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'automation' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Automated WhatsApp Messages</h3>
          
          <div className="space-y-6">
            {/* Receipt Upload Confirmation */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  Receipt Upload Confirmation
                </h4>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Automatically send confirmation messages when receipts are uploaded and verified.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Sample Message:</div>
                <div className="text-sm text-gray-800">
                  "✅ Receipt verified! You earned {points} loyalty points. Receipt ID: {receiptId}. 
                  Keep uploading for more rewards! 🎉"
                </div>
              </div>
            </div>

            {/* Campaign Notifications */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-blue-500" />
                  Campaign Notifications
                </h4>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Notify users about new campaigns and special promotions.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Sample Message:</div>
                <div className="text-sm text-gray-800">
                  "🚀 New campaign: {campaignName}! Upload receipts for {products} and get {bonusPoints} bonus points. 
                  Valid until {endDate}. Don't miss out!"
                </div>
              </div>
            </div>

            {/* Order Updates */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-purple-500" />
                  Order Status Updates
                </h4>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Send automatic updates when order status changes.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Sample Message:</div>
                <div className="text-sm text-gray-800">
                  "📦 Order Update: Your order #{orderNumber} is now {status}. 
                  {deliveryInfo} Track your order: {trackingLink}"
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Automation Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-3 text-green-500 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Send confirmation for receipt uploads</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-3 text-green-500 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Notify about new campaigns</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-3 text-green-500 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Send order status updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 text-green-500 focus:ring-green-500" />
                  <span className="text-sm text-gray-700">Weekly loyalty points summary</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Message History</h3>
          
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{message.phone}</div>
                      <div className="text-sm text-gray-600">{message.sentAt.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                      {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                    </span>
                    <div className="flex items-center">
                      {getStatusIcon(message.status)}
                      <span className="text-xs text-gray-500 ml-1">{message.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-800">{message.message}</p>
                </div>
                
                {(message.relatedReceiptId || message.relatedCampaignId) && (
                  <div className="text-xs text-gray-500">
                    {message.relatedReceiptId && `Related to Receipt: ${message.relatedReceiptId}`}
                    {message.relatedCampaignId && `Related to Campaign: ${message.relatedCampaignId}`}
                  </div>
                )}
              </div>
            ))}
          </div>

          {mockMessages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-600">Your WhatsApp message history will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};