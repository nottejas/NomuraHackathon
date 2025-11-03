import React, { useState } from 'react';
import { motion } from 'framer-motion';

function SponsorShowcase() {
  const [activeTab, setActiveTab] = useState('sponsors'); // sponsors, partners, donations, csr

  const sponsors = [
    { id: 1, name: 'EcoTech Solutions', tier: 'Platinum', logo: '🌟', amount: 50000, description: 'Leading green technology provider', website: 'https://ecotech.com', events: 12 },
    { id: 2, name: 'GreenBank', tier: 'Gold', logo: '🏦', amount: 30000, description: 'Sustainable banking solutions', website: 'https://greenbank.com', events: 8 },
    { id: 3, name: 'CleanEnergy Corp', tier: 'Gold', logo: '⚡', amount: 25000, description: 'Renewable energy innovators', website: 'https://cleanenergy.com', events: 6 },
    { id: 4, name: 'NatureCare', tier: 'Silver', logo: '🌱', amount: 15000, description: 'Organic products manufacturer', website: 'https://naturecare.com', events: 5 },
    { id: 5, name: 'AquaPure', tier: 'Silver', logo: '💧', amount: 12000, description: 'Water purification systems', website: 'https://aquapure.com', events: 4 },
    { id: 6, name: 'RecycleTech', tier: 'Bronze', logo: '♻️', amount: 8000, description: 'Recycling technology solutions', website: 'https://recycletech.com', events: 3 }
  ];

  const partners = [
    { id: 1, name: 'Green Warriors Foundation', type: 'NGO', logo: '🌳', members: 5000, established: '2015', description: 'Leading environmental NGO working on coastal cleanup', impact: '250 tons waste removed' },
    { id: 2, name: 'Ocean Conservancy', type: 'International', logo: '🌊', members: 12000, established: '2010', description: 'Global ocean protection organization', impact: '500 beach cleanups' },
    { id: 3, name: 'City Environmental Board', type: 'Government', logo: '🏛️', members: 200, established: '2005', description: 'Municipal environmental authority', impact: '15 cities covered' },
    { id: 4, name: 'Youth for Climate', type: 'Youth Org', logo: '👨‍👩‍👧', members: 8000, established: '2018', description: 'Youth-led climate action group', impact: '300 youth events' },
    { id: 5, name: 'Tech for Good Alliance', type: 'Tech Consortium', logo: '💻', members: 150, established: '2020', description: 'Technology companies for sustainability', impact: '50 tech solutions' }
  ];

  const donations = [
    { id: 1, month: 'January', amount: 45000, donors: 234, corporate: 35000, individual: 10000 },
    { id: 2, month: 'February', amount: 52000, donors: 289, corporate: 40000, individual: 12000 },
    { id: 3, month: 'March', amount: 68000, donors: 356, corporate: 50000, individual: 18000 },
    { id: 4, month: 'April', amount: 71000, donors: 412, corporate: 55000, individual: 16000 },
    { id: 5, month: 'May', amount: 63000, donors: 378, corporate: 48000, individual: 15000 },
    { id: 6, month: 'June', amount: 58000, donors: 334, corporate: 45000, individual: 13000 }
  ];

  const csrPrograms = [
    { id: 1, company: 'EcoTech Solutions', program: 'Green Tech Initiative', impact: '100 schools equipped with recycling systems', investment: '₹50L', year: '2024', status: 'Active' },
    { id: 2, company: 'GreenBank', program: 'Sustainable Communities', impact: '50 villages with clean water access', investment: '₹35L', year: '2024', status: 'Active' },
    { id: 3, company: 'CleanEnergy Corp', program: 'Solar for Schools', impact: '200 schools with solar panels', investment: '₹1Cr', year: '2023', status: 'Completed' },
    { id: 4, company: 'NatureCare', program: 'Organic Farming Support', impact: '500 farmers trained in organic methods', investment: '₹25L', year: '2024', status: 'Active' }
  ];

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalDonors = donations.reduce((sum, d) => sum + d.donors, 0);

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum': return 'from-purple-500 to-blue-500';
      case 'Gold': return 'from-yellow-500 to-orange-500';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Bronze': return 'from-orange-600 to-red-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'Gold': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'Silver': return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'Bronze': return 'bg-orange-100 border-orange-300 text-orange-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen px-4 py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🤝</div>
            <h1 className="text-5xl font-bold mb-2 text-gray-900">Sponsors & Partners</h1>
            <p className="text-xl text-gray-600">Together making a difference</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-3 mb-8">
          {[
            { key: 'sponsors', label: 'Our Sponsors', icon: '🌟' },
            { key: 'partners', label: 'Partner Organizations', icon: '🤝' },
            { key: 'donations', label: 'Donation Tracking', icon: '💰' },
            { key: 'csr', label: 'CSR Programs', icon: '🏢' }
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.key ? 'bg-gradient-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Sponsors Tab */}
        {activeTab === 'sponsors' && (
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🌟</div>
                <h2 className="text-2xl font-bold text-gray-900">Thank You to Our Sponsors</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((sponsor, index) => (
                  <motion.div key={sponsor.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-gray-200">
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${getTierColor(sponsor.tier)}`}></div>
                    <div className="text-6xl text-center mb-4">{sponsor.logo}</div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{sponsor.name}</h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs border mb-3 ${getTierBadge(sponsor.tier)}`}>
                      {sponsor.tier} Sponsor
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{sponsor.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Contribution:</span>
                        <span className="text-green-600 font-semibold">₹{(sponsor.amount / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Events Sponsored:</span>
                        <span className="text-gray-900 font-semibold">{sponsor.events}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-2 bg-purple-100 text-purple-700 border border-purple-300 rounded-lg hover:bg-purple-200 transition-all text-sm">
                      Visit Website →
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Sponsorship Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Platinum', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                  <div key={tier} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${getTierColor(tier)} flex items-center justify-center text-white font-bold text-xl`}>
                      {tier[0]}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{tier}</h4>
                    <p className="text-xs text-gray-600">
                      {tier === 'Platinum' && '₹50,000+'}
                      {tier === 'Gold' && '₹25,000+'}
                      {tier === 'Silver' && '₹10,000+'}
                      {tier === 'Bronze' && '₹5,000+'}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {partners.map((partner, index) => (
              <motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{partner.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-1">
                          {partner.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">Est. {partner.established}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-4">{partner.description}</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                        <div className="text-xl font-bold text-gray-900">{partner.members.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Members</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-200">
                        <div className="text-xl font-bold text-green-600">✓</div>
                        <div className="text-xs text-gray-600">Verified</div>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                      <p className="text-xs text-green-700">
                        <strong>Impact:</strong> {partner.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Donations Tab */}
        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-4xl mb-2">💰</div>
                <div className="text-3xl font-bold text-green-600 mb-1">₹{(totalDonations / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Total Raised</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold text-blue-600 mb-1">{totalDonors}</div>
                <div className="text-sm text-gray-600">Total Donors</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">₹{((donations.reduce((sum, d) => sum + d.corporate, 0)) / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Corporate</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200">
                <div className="text-4xl mb-2">🙋</div>
                <div className="text-3xl font-bold text-yellow-600 mb-1">₹{((donations.reduce((sum, d) => sum + d.individual, 0)) / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-600">Individual</div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Donations</h3>
              <div className="space-y-3">
                {donations.map((donation, index) => (
                  <div key={donation.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{donation.month} 2024</h4>
                      <span className="text-2xl font-bold text-green-600">₹{(donation.amount / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Donors: </span>
                        <span className="text-gray-900 font-semibold">{donation.donors}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Corporate: </span>
                        <span className="text-purple-600 font-semibold">₹{(donation.corporate / 1000).toFixed(0)}K</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Individual: </span>
                        <span className="text-yellow-600 font-semibold">₹{(donation.individual / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: `${(donation.amount / 75000) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* CSR Programs Tab */}
        {activeTab === 'csr' && (
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🏢</div>
                <h2 className="text-2xl font-bold text-gray-900">Corporate Social Responsibility Programs</h2>
              </div>
              <div className="space-y-4">
                {csrPrograms.map((program, index) => (
                  <motion.div key={program.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="p-6 bg-gray-50 rounded-xl border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{program.program}</h3>
                        <p className="text-purple-600 font-semibold">{program.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${program.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{program.impact}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-600">Investment: </span>
                        <span className="text-yellow-600 font-semibold">{program.investment}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Year: </span>
                        <span className="text-gray-900 font-semibold">{program.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Become a CSR Partner</h3>
              <p className="text-gray-700 mb-6 text-center">Join leading companies in making a positive environmental impact through our CSR partnership programs.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Targeted Impact</h4>
                  <p className="text-sm text-gray-700">Focus on measurable environmental outcomes</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Transparent Reporting</h4>
                  <p className="text-sm text-gray-700">Regular impact reports and analytics</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl mb-2">🤝</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Employee Engagement</h4>
                  <p className="text-sm text-gray-700">Involve your team in meaningful activities</p>
                </div>
              </div>
              <button className="mt-6 w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Contact Us for Partnership
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SponsorShowcase;
