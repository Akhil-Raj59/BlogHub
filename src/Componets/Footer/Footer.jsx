import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-orange-800 text-white border-t border-t-orange-600">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-orange-300">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-orange-300">Company</h3>
              <ul>
                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item, index) => (
                  <li className="mb-4" key={index}>
                    <Link className="text-base font-medium hover:text-orange-400" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-orange-300">Support</h3>
              <ul>
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item, index) => (
                  <li className="mb-4" key={index}>
                    <Link className="text-base font-medium hover:text-orange-400" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-orange-300">Legals</h3>
              <ul>
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item, index) => (
                  <li className="mb-4" key={index}>
                    <Link className="text-base font-medium hover:text-orange-400" to="/">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
