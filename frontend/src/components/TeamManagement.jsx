import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TeamManagement() {
  const [activeTab, setActiveTab] = useState('myteam');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [chatMessage, setChatMessage] = useState('');

  const myTeam = {
    name: 'Eco Warriors',
    description: 'Committed to making Chennai cleaner',
    role: 'Leader',
    members: [
      { id: 1, name: 'Rajesh Kumar', role: 'Leader', avatar: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=10b981&color=fff', wasteCollected: 245, eventsAttended: 12 },
      { id: 2, name: 'Priya Sharma', role: 'Co-Leader', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', wasteCollected: 198, eventsAttended: 10 },
      { id: 3, name: 'Amit Patel', role: 'Member', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', wasteCollected: 167, eventsAttended: 9 }
    ],
    stats: { totalWaste: 887, totalEvents: 46, co2Saved: 658, rank: 3, members: 5 },
    chat: [
      { id: 1, user: 'Priya Sharma', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=667eea&color=fff', message: 'Great job everyone!', time: '2:30 PM' },
      { id: 2, user: 'Amit Patel', avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff', message: 'When is the next event?', time: '2:35 PM' }
    ]
  };

  const teamLeaderboard = [
    { id: 1, rank: 1, name: 'Green Guardians', members: 12, wasteCollected: 1245, eventsCompleted: 28, avatar: '🌳', change: 0 },
    { id: 2, rank: 2, name: 'Ocean Cleaners', members: 8, wasteCollected: 1050, eventsCompleted: 24, avatar: '🌊', change: 1 },
    { id: 3, rank: 3, name: 'Eco Warriors', members: 5, wasteCollected: 887, eventsCompleted: 20, avatar: '♻️', change: -1 }
  ];

  const challenges = [
    { id: 1, title: 'Beach Cleanup Marathon', description: 'Collect 500kg in one month', prize: '🏆 Trophy', deadline: '2024-04-15', progress: 342, target: 500, participants: 8 },
    { id: 2, title: 'Zero Plastic Week', description: 'Organize 5 plastic-free events', prize: '🎖️ Badge', deadline: '2024-04-10', progress: 3, target: 5, participants: 15 }
  ];

  return (
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">👥 Team Management</h1>
          <p className="text-xl text-gray-600">Collaborate and compete together</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-8">
          {[{ key: 'myteam', label: 'My Team', icon: '👥' }, { key: 'leaderboard', label: 'Leaderboard', icon: '🏆' }, { key: 'challenges', label: 'Challenges', icon: '🎯' }].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${activeTab === tab.key ? 'bg-blue-600 text-white border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {activeTab === 'myteam' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-4xl">♻️</div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{myTeam.name}</h2>
                    <p className="text-gray-600 mt-1">{myTeam.description}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-full text-sm font-semibold">Role: {myTeam.role}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowInviteModal(true)} className="px-4 py-2 bg-blue-600 text-black border-2 border-gray-900 rounded-lg hover:bg-blue-700 transition-all">📧 Invite</button>
                  <button onClick={() => setShowChatModal(true)} className="px-4 py-2 bg-purple-600 text-black border-2 border-gray-900 rounded-lg hover:bg-purple-700 transition-all">💬 Chat</button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-white border border-gray-200 rounded-lg"><div className="text-2xl font-bold text-green-600">{myTeam.stats.totalWaste}kg</div><div className="text-xs text-gray-500">Waste</div></div>
                <div className="text-center p-3 bg-white border border-gray-200 rounded-lg"><div className="text-2xl font-bold text-blue-600">{myTeam.stats.co2Saved}kg</div><div className="text-xs text-gray-500">CO₂</div></div>
                <div className="text-center p-3 bg-white border border-gray-200 rounded-lg"><div className="text-2xl font-bold text-purple-600">{myTeam.stats.totalEvents}</div><div className="text-xs text-gray-500">Events</div></div>
                <div className="text-center p-3 bg-white border border-gray-200 rounded-lg"><div className="text-2xl font-bold text-yellow-600">#{myTeam.stats.rank}</div><div className="text-xs text-gray-500">Rank</div></div>
                <div className="text-center p-3 bg-white border border-gray-200 rounded-lg"><div className="text-2xl font-bold text-orange-600">{myTeam.stats.members}</div><div className="text-xs text-gray-500">Members</div></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                {myTeam.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border-2 border-slate-600" />
                      <div><h4 className="font-semibold text-gray-900">{member.name}</h4><p className="text-xs text-gray-500">{member.role}</p></div>
                    </div>
                    <div className="text-right"><div className="text-sm text-gray-900 font-semibold">{member.wasteCollected}kg</div><div className="text-xs text-gray-500">{member.eventsAttended} events</div></div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Top Teams</h2>
            <div className="space-y-3">
              {teamLeaderboard.map((team) => (
                <div key={team.id} className={`flex items-center justify-between p-4 rounded-lg border ${team.name === myTeam.name ? 'bg-purple-100 border-2 border-purple-500' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl font-bold w-12 text-center">{team.rank === 1 ? '🥇' : team.rank === 2 ? '🥈' : team.rank === 3 ? '🥉' : `#${team.rank}`}</div>
                    <div className="text-4xl">{team.avatar}</div>
                    <div className="flex-1"><h4 className="font-bold text-gray-900 text-lg">{team.name}</h4><p className="text-sm text-gray-600">{team.members} members</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div><div className="text-xl font-bold text-green-600">{team.wasteCollected}kg</div><div className="text-xs text-gray-500">Waste</div></div>
                    <div><div className="text-xl font-bold text-blue-600">{team.eventsCompleted}</div><div className="text-xs text-gray-500">Events</div></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div key={challenge.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{challenge.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">Progress</span><span className="text-sm text-gray-900 font-semibold">{challenge.progress}/{challenge.target}</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></motion.div></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700"><p>🏆 {challenge.prize}</p><p className="mt-1">👥 {challenge.participants} teams</p></div>
                  <button className="px-4 py-2 bg-purple-600 text-white border-2 border-gray-900 rounded-lg hover:bg-purple-700 transition-all">Join</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {showInviteModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowInviteModal(false)} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Invite Member</h2>
                <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="email@example.com" className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
                <div className="flex gap-3">
                  <button onClick={() => setShowInviteModal(false)} className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">Cancel</button>
                  <button onClick={() => { alert(`Invite sent to ${inviteEmail}`); setShowInviteModal(false); }} className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        <AnimatePresence>
          {showChatModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowChatModal(false)} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Chat</h2>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {myTeam.chat.map((msg) => (
                    <div key={msg.id} className="flex gap-3"><img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full" /><div><span className="font-semibold text-gray-900 text-sm">{msg.user}</span><p className="text-gray-700 text-sm bg-gray-100 rounded-lg p-3">{msg.message}</p></div></div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Type message..." className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900" />
                  <button onClick={() => { alert('Message sent'); setChatMessage(''); }} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Send</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TeamManagement;
