import {UserNav} from '@/components/User/UserNav'
import {NavMenu} from './NavMenu'
import {loadGlobalNavigation} from '@/sanity/loader/loadQuery'

export const SubNav = async () => {
  const {data} = await loadGlobalNavigation()

  return (
    <div className="mt-4 px-4 md:px-16 lg:px-32">
      <div className="flex gap-4 justify-between items-center py-2 border-y text-sm font-light tracking-wider">
        <NavMenu data={data} />
        <UserNav />
      </div>
    </div>
  );
};
