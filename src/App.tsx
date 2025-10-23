import { useState } from 'react';
import { Input } from './components/Input/Input';
import { SidebarMenu } from './components/SidebarMenu/SidebarMenu';
import { Toast } from './components/Toast/Toast';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <Input type="text" placeholder="Type something..." clearable={true} />
      <Input type="password" placeholder="Enter your password..." clearable={true} />
      <button onClick={() => setIsSidebarOpen(true)}>Open Sidebar Menu</button>
      <SidebarMenu
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={[
          { label: 'Dashboard' },
          {
            label: 'Settings',
            children: [{ label: 'Profile' }, { label: 'Security' }],
          },
          { label: 'Help' },
        ]}
      />
      <Toast message="Welcome to the Toast notification!" type="success" show={true} />
    </div>
  );
}

export default App;
