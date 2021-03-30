import React from 'react';

import RequestToolbar from '../../Components/VettingApp/CommonComponents/RequestToolbar';
import ManageTeamDrawer from '../../Components/VettingApp/CommonComponents/ManageTeamDrawer';

export default {
  title: 'Organisms/Vetting/RequestToolbar',
  component: RequestToolbar,
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
ResearcherDraft.storyName = 'Researcher - Draft';

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
ResearcherSubmitted.storyName = 'Researcher - Submitted';

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
ResearcherUnderReview.storyName = 'Researcher - Under review';

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
ResearcherChangesRequested.storyName = 'Researcher - Changes requested';

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
ResearcherWithdrawn.storyName = 'Researcher - Withdrawn';

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
ResearcherApproved.storyName = 'Researcher - Approved';

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
ResearcherDenied.storyName = 'Researcher - Denied';

export const AnalystUnassignedDraft = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };

  return (
    <>
      <RequestToolbar
        role="analyst"
        status="draft"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedDraft.storyName = 'Analyst (Unassigned) - Draft';

export const AnalystUnassignedSubmitted = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="submitted"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />

      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedSubmitted.storyName = 'Analyst (Unassigned) - Submitted';

export const AnalystUnassignedUnderReview = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="under review"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedUnderReview.storyName = 'Analyst (Unassigned) - Under review';

export const AnalystUnassignedChangesRequested = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="changes requested"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedChangesRequested.storyName =
  'Analyst (Unassigned) - Changes requested';

export const AnalystUnassignedApproved = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="approved"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedApproved.storyName = 'Analyst (Unassigned) - Approved';

export const AnalystUnassignedDenied = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="denied"
        assignees={{
          lead: '',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystUnassignedDenied.storyName = 'Analyst (Unassigned) - Denied';

export const AnalystLeadDraft = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="draft"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadDraft.storyName = 'Analyst (Lead) - Draft';

export const AnalystLeadSubmitted = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="submitted"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadSubmitted.storyName = 'Analyst (Lead) - Submitted';

export const AnalystLeadUnderReview = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="under review"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadUnderReview.storyName = 'Analyst (Lead) - Under review';

export const AnalystLeadChangesRequested = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="changes requested"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadChangesRequested.storyName = 'Analyst (Lead) - Changes requested';

export const AnalystLeadApproved = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="approved"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadApproved.storyName = 'Analyst (Lead) - Approved';

export const AnalystLeadDenied = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="denied"
        assignees={{
          lead: 'Tony Stark',
          support: [],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystLeadDenied.storyName = 'Analyst (Lead) - Denied';

export const AnalystSupportDraft = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="draft"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportDraft.storyName = 'Analyst (Support) - Draft';

export const AnalystSupportSubmitted = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="submitted"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportSubmitted.storyName = 'Analyst (Support) - Submitted';

export const AnalystSupportUnderReview = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="under review"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportUnderReview.storyName = 'Analyst (Support) - Under review';

export const AnalystSupportChangesRequested = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="changes requested"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportChangesRequested.storyName =
  'Analyst (Support) - Changes requested';

export const AnalystSupportApproved = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="approved"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportApproved.storyName = 'Analyst (Support) - Approved';

export const AnalystSupportDenied = (args) => {
  const [open, setOpen] = React.useState({
    manageTeamDrawer: false,
  });

  const toggleManageTeamDrawer = () => {
    setOpen({...open, manageTeamDrawer: !open.manageTeamDrawer});
  };
  return (
    <>
      <RequestToolbar
        role="analyst"
        status="denied"
        assignees={{
          lead: '',
          support: ['Tony Stark'],
        }}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
      <ManageTeamDrawer
        open={open.manageTeamDrawer}
        clickHandler={toggleManageTeamDrawer}
        toggleManageTeamDrawer={toggleManageTeamDrawer}
      />
    </>
  );
};
AnalystSupportDenied.storyName = 'Analyst (Support) - Denied';
