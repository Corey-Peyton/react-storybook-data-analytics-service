import React from 'react';

import RequestToolbar from '../../Components/VettingApp/CommonComponents/RequestToolbar';
import ManageTeamDrawer from '../../Components/VettingApp/CommonComponents/ManageTeamDrawer';

export default {
  title: 'Organisms/Vetting/RequestToolbar',
  component: RequestToolbar,
};

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
