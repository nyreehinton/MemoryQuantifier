import React, { useState } from 'react';

const DashboardPreview = () => {
  const [selectedEvidence, setSelectedEvidence] = useState('PREQ-01');
  const [selectedAction, setSelectedAction] = useState('action-1');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-12">
      {/* Header */}
      <header className="bg-gray-800 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white tracking-tight">Memory Quantifier</h1>
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Dashboard
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Timeline
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Evidence
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Damages
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Tasks
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Case Header */}
      <div className="bg-gray-800 border-b border-gray-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                Hinton v. Capital One
              </h2>
              <p className="mt-2 text-lg text-gray-400">
                Case: 2:24-cv-03039-CBM-JPR • U.S. District Court, Central District of California
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-800 text-yellow-200">
                Active Case
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Case Description */}
      <div className="bg-gray-800 border-b border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-900 bg-opacity-20 border border-yellow-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-yellow-200 mb-2">Case Overview</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              This case arose when Capital One allegedly retaliated against Plaintiff Nyree Hinton
              by restricting online portal access and reporting his Tesla auto loan as delinquent
              and later charged-off after he filed an initial lawsuit in Georgia (July 2023).
            </p>
            <p className="text-gray-200 text-sm leading-relaxed mt-3">
              These inaccurate credit reports subsequently triggered at least 38 documented adverse
              actions from multiple creditors between January-April 2024, including credit limit
              reductions, loan denials, and financing rejections. The resulting damages include
              additional security deposits, increased interest rates, lost deposits, and claimed
              educational opportunity costs related to Harvard withdrawal.
            </p>
            <p className="text-gray-200 text-sm leading-relaxed mt-3">
              While settlements have been reached with all three major credit reporting agencies,
              the case continues against Capital One, with urgent need for successor counsel. The
              withdrawal notice from current representation after failed mediation blindsided Mr.
              Hinton completely—had he known this was coming, he would have strategized his case
              differently and secured replacement counsel before mediation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Key Entities & Timeline */}
          <div className="lg:col-span-4 space-y-8">
            {/* Key Entities Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6">
                <h3 className="text-lg font-medium text-white">Key Parties</h3>
              </div>

              <div className="divide-y divide-gray-700">
                <div className="px-4 py-5 hover:bg-gray-700 transition duration-150">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-yellow-800 flex items-center justify-center text-white text-lg font-semibold">
                        NH
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-base font-medium text-white">Nyree Hinton</h4>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-yellow-800 text-yellow-200">
                          Plaintiff
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Seeking successor counsel following withdrawal notice
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-5 hover:bg-gray-700 transition duration-150">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-red-900 flex items-center justify-center text-white text-lg font-semibold">
                        CO
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-base font-medium text-white">Capital One</h4>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-red-900 text-red-200">
                          Defendant
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Mediation failed on April 3, 2025
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-5 hover:bg-gray-700 transition duration-150">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-semibold">
                        TF
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-base font-medium text-white">Todd M. Friedman, P.C.</h4>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-gray-600 text-gray-200">
                          Withdrawing
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        Filed notice of intent to withdraw after mediation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-6 text-center">
                  <button className="text-sm text-gray-400 hover:text-white">
                    View all parties
                  </button>
                </div>
              </div>
            </div>

            {/* CRAs Status */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
              <h3 className="text-base font-medium text-white mb-4">Credit Reporting Agencies</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Experian</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-gray-500 mt-1">Sep 10, 2024</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">TransUnion</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-gray-500 mt-1">Sep 24, 2024</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-400 mb-1">Equifax</div>
                  <div className="text-sm font-medium text-green-400">Settled</div>
                  <div className="text-xs text-gray-500 mt-1">Dec 2024</div>
                </div>
              </div>
            </div>

            {/* Timeline Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Case Timeline</h3>
                <button className="text-sm text-gray-400 hover:text-white">View all</button>
              </div>

              <div
                className="flow-root p-4 overflow-hidden overflow-y-auto scrollbar-hide"
                style={{ maxHeight: '440px' }}
              >
                <ul className="-mb-8">
                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          🚪
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Counsel Withdrawing</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Todd M. Friedman, P.C. notifies intent to withdraw
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Apr 3, 2025</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ❌
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Mediation Failed</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Mediation with Capital One deemed nuisance value
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Apr 3, 2025</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ✅
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Equifax Settlement</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Settlement agreement signed with Equifax
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">~Dec 2024</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ✅
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">TransUnion Settlement</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Settlement agreement signed with TransUnion
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Sep 24, 2024</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ✅
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Experian Settlement</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Settlement agreement signed with Experian
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Sep 10, 2024</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ⚖️
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">FAC Filed</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            First Amended Complaint filed in U.S. District Court
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Jun 4, 2024</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          ⚖️
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Initial Lawsuit Filed</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Filed in California Superior Court, Los Angeles
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Mar 11, 2024</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative pb-8">
                    <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-600" />
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          📉
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Charged-Off Account</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Capital One reports account as "Charged-Off"
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Dec 10, 2023</div>
                      </div>
                    </div>
                  </li>

                  <li className="relative">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-800 bg-gray-700 text-white">
                          📄
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-white">Initial Transaction</p>
                          <p className="mt-0.5 text-sm text-gray-400">
                            Plaintiff purchased Tesla, financed via Capital One
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-400">Nov 9, 2022</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="px-4 py-3 bg-yellow-900 text-sm text-yellow-200 border-t border-yellow-800 rounded-b-lg">
                <span className="font-semibold">URGENT:</span> Successor counsel needed. Previous
                counsel blindsided plaintiff with withdrawal notice on April 3, 2025.
              </div>
            </div>
          </div>

          {/* Middle Column - Evidence & Damages */}
          <div className="lg:col-span-4 space-y-8">
            {/* Critical Evidence Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6">
                <h3 className="text-lg font-medium text-white">Critical Evidence Needs</h3>
              </div>

              <div
                className="overflow-hidden overflow-y-auto scrollbar-hide"
                style={{ maxHeight: '370px' }}
              >
                <ul className="divide-y divide-gray-700">
                  <li className="px-4 py-4 bg-red-900 bg-opacity-20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate flex items-center">
                          <span className="mr-2 flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          PREQ-01
                        </p>
                        <p className="mt-1 text-sm text-gray-400 truncate">
                          Credit Reports Used by Creditors
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Prove inaccurate info was seen by decision-maker
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-md border bg-red-900 text-red-200 border-red-700">
                          CRITICAL NEED
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate flex items-center">
                          <span className="mr-2 flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          BASELINE-01
                        </p>
                        <p className="mt-1 text-sm text-gray-400 truncate">
                          Experian: Experian Baseline Report
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Date Range: Jun/Jul 2023</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-md border bg-orange-900 text-orange-200 border-orange-700">
                          Outstanding
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate flex items-center">
                          <span className="mr-2 flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                          BASELINE-02
                        </p>
                        <p className="mt-1 text-sm text-gray-400 truncate">
                          TransUnion: TransUnion Baseline Report
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Date Range: Jun/Jul 2023</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-md border bg-orange-900 text-orange-200 border-orange-700">
                          Outstanding
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate flex items-center">
                          CR_NEED_01
                        </p>
                        <p className="mt-1 text-sm text-gray-400 truncate">
                          TransUnion: Feb/Mar 2024 Report
                        </p>
                        <p className="mt-1 text-xs text-gray-500">Basis for BoA (Doc 1)</p>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex items-center">
                        <span className="px-2 py-1 text-xs rounded-md border bg-orange-900 text-orange-200 border-orange-700">
                          Outstanding
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="px-4 py-3 bg-gray-700 text-xs text-gray-300 rounded-b-lg flex justify-between">
                <span>
                  <strong>3</strong> of <strong>27</strong> evidence needs satisfied
                </span>
                <button className="text-gray-300 hover:text-white">View all</button>
              </div>
            </div>

            {/* Damages Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6">
                <h3 className="text-lg font-medium text-white">Damages Summary</h3>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <div className="text-gray-300 font-semibold text-sm">Pecuniary Damages</div>
                  <div className="mt-2 text-xl font-bold text-white">$400,000+</div>
                  <div className="mt-1 text-xs text-gray-400">5 categories</div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <div className="text-gray-300 font-semibold text-sm">Non-Pecuniary Damages</div>
                  <div className="mt-2 text-xl font-bold text-white">$1,200,000+</div>
                  <div className="mt-1 text-xs text-gray-400">Open-ended</div>
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="h-32 flex items-end">
                  <div className="flex-1 mx-1 flex flex-col items-center group">
                    <div className="w-full bg-blue-700 rounded-t h-10"></div>
                    <div className="mt-2 text-xs text-gray-400">PEC-COST</div>
                  </div>
                  <div className="flex-1 mx-1 flex flex-col items-center group">
                    <div className="w-full bg-purple-700 rounded-t h-14"></div>
                    <div className="mt-2 text-xs text-gray-400">PEC-PAY</div>
                  </div>
                  <div className="flex-1 mx-1 flex flex-col items-center group">
                    <div className="w-full bg-green-700 rounded-t h-6"></div>
                    <div className="mt-2 text-xs text-gray-400">PEC-FEE</div>
                  </div>
                  <div className="flex-1 mx-1 flex flex-col items-center group">
                    <div className="w-full bg-yellow-700 rounded-t h-8"></div>
                    <div className="mt-2 text-xs text-gray-400">PEC-DEP</div>
                  </div>
                  <div className="flex-1 mx-1 flex flex-col items-center group">
                    <div className="w-full bg-red-700 rounded-t h-32"></div>
                    <div className="mt-2 text-xs text-gray-400">NONPEC-ED</div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-700 text-sm text-gray-300 rounded-b-lg text-right">
                Total Claimed: <span className="font-bold">$1,600,000+</span>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Tasks */}
          <div className="lg:col-span-4 space-y-8">
            {/* Adverse Actions Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Adverse Actions</h3>
                <span className="bg-gray-700 px-2 py-1 rounded-md text-sm text-gray-300">
                  38 total
                </span>
              </div>

              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Source
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Doc
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    <tr className="bg-gray-700 bg-opacity-30">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Mar 7, 2024
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Bank of America
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-orange-900 text-orange-200">
                          Credit Limit
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">Doc 1</td>
                    </tr>
                    <tr className="hover:bg-gray-700 hover:bg-opacity-30 transition duration-150">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Feb 13, 2024
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Huebner Chevrolet
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-900 text-red-200">
                          Auto Denial
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">Doc 2</td>
                    </tr>
                    <tr className="hover:bg-gray-700 hover:bg-opacity-30 transition duration-150">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Jan 18, 2024
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Chase Card Services
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-orange-900 text-orange-200">
                          Credit Limit
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">Doc 3</td>
                    </tr>
                    <tr className="hover:bg-gray-700 hover:bg-opacity-30 transition duration-150">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Jan 18, 2024
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Chase Card Services
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-orange-900 text-orange-200">
                          Credit Limit
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">Doc 4</td>
                    </tr>
                    <tr className="hover:bg-gray-700 hover:bg-opacity-30 transition duration-150">
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Jan 23, 2024
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-300">
                        Earnest Operations
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-purple-900 text-purple-200">
                          Loan Denial
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">Doc 21</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-4 py-3 bg-gray-700 text-right rounded-b-lg">
                <button className="text-sm text-gray-300 hover:text-white">View all actions</button>
              </div>
            </div>

            {/* Tasks Widget */}
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              <div className="px-4 py-5 border-b border-gray-700 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Priority Tasks</h3>
                <button className="bg-yellow-700 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition duration-150">
                  New Task
                </button>
              </div>

              <div
                className="overflow-hidden overflow-y-auto scrollbar-hide"
                style={{ maxHeight: '370px' }}
              >
                <ul className="divide-y divide-gray-700">
                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150 bg-red-900 bg-opacity-20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">Find Successor Counsel</p>
                          <p className="mt-1 text-xs text-gray-400 truncate">
                            Research and contact potential replacement attorneys
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-1">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-red-900 text-red-200">
                          High
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-blue-900 text-blue-200">
                          In Progress
                        </span>
                        <span className="text-xs text-gray-400">Due: Apr 17</span>
                      </div>
                    </div>
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150 bg-red-900 bg-opacity-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            File Response to Withdraw Motion
                          </p>
                          <p className="mt-1 text-xs text-gray-400 truncate">
                            Prepare and file response to counsel's withdraw motion
                          </p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-1">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-red-900 text-red-200">
                          High
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-gray-600 text-gray-200">
                          To Do
                        </span>
                        <span className="text-xs text-red-400">Due: Apr 10</span>
                      </div>
                    </div>
                  </li>

                  <li className="px-4 py-4 hover:bg-gray-700 transition duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-white">
                            Request Credit Report CR_NEED_01
                          </p>
                          <p className="mt-1 text-xs text-gray-400 truncate">
                            Request TransUnion Feb/Mar 2024 report
                          </p>
                          <p className="mt-1 text-xs text-blue-400">Related: CR_NEED_01</p>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-1">
                        <span className="px-2 py-0.5 text-xs rounded-md bg-red-900 text-red-200">
                          High
                        </span>
                        <span className="px-2 py-0.5 text-xs rounded-md bg-blue-900 text-blue-200">
                          In Progress
                        </span>
                        <span className="text-xs text-gray-400">Due: Apr 7</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="px-4 py-3 bg-gray-700 text-sm text-red-300 rounded-b-lg">
                <strong>URGENT:</strong> 2 high-priority tasks require immediate attention
              </div>
            </div>
          </div>
        </div>

        {/* Status Footer */}
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 text-center text-gray-300 text-sm">
          <span>
            Case: 2:24-cv-03039-CBM-JPR • U.S. District Court, Central District of California •
            Hinton v. Capital One
          </span>
          <div className="mt-2 text-xs text-gray-400">
            Memory Quantifier Dashboard • Version 1.0.0
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPreview;
