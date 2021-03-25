import React from 'react';

import RequestToolbar from '../../Components/VettingApp/CommonComponents/RequestToolbar';

export default {
  title: 'Organisms/Vetting/RequestToolbar',
  component: RequestToolbar,
};

export const AnalystUnassignedDraft = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="draft"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadDraft = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="draft"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportDraft = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="draft"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const AnalystUnassignedSubmitted = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="submitted"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadSubmitted = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="submitted"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportSubmitted = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="submitted"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const AnalystUnassignedUnderReview = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="under review"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadUnderReview = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="under review"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportUnderReview = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="under review"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const AnalystUnassignedChangesRequested = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="changes requested"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadChangesRequested = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="changes requested"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportChangesRequested = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="changes requested"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const AnalystUnassignedApproved = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="approved"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadApproved = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="approved"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportApproved = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="approved"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const AnalystUnassignedDenied = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="denied"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const AnalystLeadDenied = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="denied"
      assignees={{
        lead: 'Tony Stark',
        support: [],
      }}
    />
  );
};

export const AnalystSupportDenied = (args) => {
  return (
    <RequestToolbar
      role="analyst"
      status="denied"
      assignees={{
        lead: '',
        support: ['Tony Stark'],
      }}
    />
  );
};

export const ResearcherDraft = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="draft"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherSubmitted = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="submitted"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherUnderReview = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="under review"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherChangesRequested = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="changes requested"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherWithdrawn = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="withdrawn"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherApproved = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="approved"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};

export const ResearcherDenied = (args) => {
  return (
    <RequestToolbar
      role="researcher"
      status="denied"
      assignees={{
        lead: '',
        support: [],
      }}
    />
  );
};
