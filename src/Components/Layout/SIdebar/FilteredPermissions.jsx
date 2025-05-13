export const filterSidebarItems = (admin_Sidebar, role, permissions) => {
  // console.log("admin_Sidebar", admin_Sidebar);
  // console.log("role", role);
  // console.log("permissions", permissions);

  let allPermissions = (permissions && permissions?.col_view_permission) || [];
  return admin_Sidebar.filter((item) => {
    const hasPermission =
      item.permission === "0" || item.permission === 0
        ? role === 0
        : allPermissions.includes(item.permission);

    if (hasPermission) {
      if (item.NestedElement && item.NestedElement.length > 0) {
        item.NestedElement = item.NestedElement.filter((nestedItem) => {
          return nestedItem.permission === "0" || nestedItem.permission === 0
            ? role === 0
            : allPermissions.includes(nestedItem.permission);
        });
      }
      return true;
    }
    return false;
  });
};
