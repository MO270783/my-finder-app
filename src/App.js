import React from 'react';
import { Process } from './hostfinder/Process';
import './App.css';
import { GrepResult } from './logfinder/GrepResult';
import { Region } from './hostfinder/Region';

const PROCESS_NAMES = ['abc_server_processName', 'def_server_processName'];
const HOST_NAMES = ['host1', 'host2'];

function WhatWhereApp() {
  return (
    <ul>
      {PROCESS_NAMES.map(processName => {
        return (
          <li key={processName}>
            <Process processName={processName}>
              <Region region="NYK" processName={processName} />
              <Region region="LON" processName={processName} />
              <Region region="TKY" processName={processName} />
            </Process>
          </li>
        );
      })}
    </ul>
  );
}

function GrepApp() {
  return (
    <ul>
      {PROCESS_NAMES.map(processName => {
        return (
          <li key={processName}>
            <Process processName={processName}>
              {HOST_NAMES.map(hostname => {
                return (
                  <GrepResult
                    key={hostname}
                    processName={processName}
                    hostName={hostname}
                    patternToSearchFor="pattern"
                  />
                );
              })}
            </Process>
          </li>
        );
      })}
    </ul>
  );
}
export default App;
