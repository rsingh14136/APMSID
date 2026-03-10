export function transformMenu(apiMenus) {
  const result = {
    services: [],
    admin: [],
    reports: []
  };

  const serviceMap = {};
  const reportMap = {};

  apiMenus.forEach((menu) => {
    const parts = menu.varMenuName.split("#");

    const level1 = parts[1]; // Services/Admin/Reports
    const level2 = parts[2]; // Demand/Issue
    const level3 = parts[3]; // actual menu

    const item = {
      title: level3,
      url: menu.varURL,
      menuId: menu.varMenuId
    };

    if (level1 === "Services") {
      if (!serviceMap[level2]) {
        serviceMap[level2] = {
          title: level2,
          children: []
        };
        result.services.push(serviceMap[level2]);
      }

      serviceMap[level2].children.push(item);
    }

    else if (level1 === "Admin") {
      result.admin.push({
        title: level2,
        url: menu.varURL,
        menuId: menu.varMenuId
      });
    }

    else if (level1 === "Reports") {
      if (!reportMap[level2]) {
        reportMap[level2] = {
          title: level2,
          children: []
        };
        result.reports.push(reportMap[level2]);
      }

      reportMap[level2].children.push(item);
    }
  });

  return result;
}