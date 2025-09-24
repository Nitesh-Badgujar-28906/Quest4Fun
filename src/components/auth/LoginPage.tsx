import React, { useState } from 'react';
import ChildLogin from '@/components/auth/ChildLogin';
import ParentLogin from '@/components/auth/ParentLogin';

type LoginMode = 'child' | 'parent';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<LoginMode>('child');

  const switchToParent = () => setMode('parent');
  const switchToChild = () => setMode('child');

  if (mode === 'parent') {
    return <ParentLogin onSwitchToChild={switchToChild} />;
  }

  return <ChildLogin onSwitchToParent={switchToParent} />;
};

export default LoginPage;