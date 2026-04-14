const maxAge = 80;

const baseData = [
  { title: "小学入学窗口", type: "硬门槛", suggested: "6岁左右", detail: "义务教育通常要求儿童年满6周岁入学；各地执行中常按当年9月1日前满6周岁掌握，部分地区会有细微差异。", limit: "晚一年入学会导致整条教育时间线顺延一年，中考、高考、毕业、就业等节点整体后移。", cost: "代价主要是整年时间成本，之后很难把制度时间追回来。", extra: "属于早期小错位会长期传导的窗口。" },
  { title: "合法就业起点", type: "硬门槛", suggested: "16岁", detail: "我国禁止招用不满16周岁的未成年人；16至18岁属于未成年工，受特殊保护。", limit: "16岁前几乎不存在合法全职就业空间；16至18岁也不能完全按成人劳动力使用。", cost: "代价主要是无法提前用劳动换经验和收入，部分‘早工作早独立’路径被压缩。", extra: "这是提前进入社会的最低合法起点，但不等于最佳发展路径。" },
  { title: "成年与独立民事能力窗口", type: "硬门槛", suggested: "18岁", detail: "18周岁以上为成年人，通常具有完全民事行为能力，可独立实施民事法律行为。", limit: "18岁前很多合同、财产、身份类事务仍需法定代理人参与。", cost: "代价主要是自主性缺失，签约、处分财产、独立承担法律后果等能力受限。", extra: "16岁以上且以劳动收入为主要生活来源者，可依法视为完全民事行为能力人。" },
  { title: "驾照与基础流动性窗口", type: "硬门槛", suggested: "18岁起", detail: "小型汽车、小型自动挡汽车等准驾车型申请条件通常为18周岁以上；部分车型还有年龄上限。", limit: "18岁前不能合法取得C照；职业型驾照超过年龄上限后直接失去资格。", cost: "代价体现在职业选择变窄、通勤和跨城流动机会下降；后补虽可考，但很多岗位招聘窗口不会等待。", extra: "对普通人是生活半径窗口，对司机类职业是职业准入窗口。" },
  { title: "法定结婚年龄窗口", type: "硬门槛", suggested: "女20岁/男22岁", detail: "现行规则下，法定结婚年龄为男不得早于22周岁，女不得早于20周岁。", limit: "未到法定年龄，婚姻登记机关不予登记。", cost: "代价主要是家庭规划顺延，包括购房、落户、生育、家庭资产安排等节奏后移。", extra: "这是法律资格窗口，不代表最佳结婚年龄。" },
  { title: "征兵窗口", type: "硬门槛", suggested: "18至22/24/26岁", detail: "男兵通常为18至22岁；普通高校本专科毕业生或毕业班学生可放宽到24岁；研究生毕业生及在校生可放宽到26岁。", limit: "超过年龄后，大多数义务兵入口直接关闭。", cost: "代价是无法再通过义务兵路径获得军旅经历及相关后续转化机会。", extra: "这是典型‘错过即消失’的窗口，补救空间极小。" },
  { title: "应届生身份窗口", type: "现实中的准硬门槛", suggested: "毕业当年+择业期2年内", detail: "普通高校毕业生在离校时和国家规定择业期二年内，若未落实工作单位且档案等保留在规定机构，可按应届高校毕业生对待。", limit: "错过后，很多校招、定向招录、只限应届岗位会消失。", cost: "代价通常不是培训费，而是岗位池大幅缩小；需要靠社招履历、实习经历或考试成绩重新证明自己。", extra: "这是中国非常关键的隐形窗口，尤其影响央国企、体制内和部分大厂校招。" },
  { title: "公务员报考年龄窗口", type: "硬门槛", suggested: "通常18至38岁", detail: "截至2026年度国考，一般报考者年龄要求通常为18周岁以上、38周岁以下；应届硕士、博士研究生可适当放宽。", limit: "超龄后，多数国考岗位直接失去资格。", cost: "代价极高，因为不是‘晚点再努力’就能解决，而是赛道直接关闭；想转体制只能寻找极少数特殊通道。", extra: "过去常见说法是35岁线，但近年国考年龄线已有调整；地方招录和事业单位仍需看具体公告。" },
  { title: "生育力与妊娠风险窗口（尤其女性）", type: "生理窗口", suggested: "关键生育决策尽量放在35岁前", detail: "35岁以上孕产妇通常被纳入更高风险管理范围，妊娠合并症和并发症风险上升。", limit: "过了35岁并非不能生育，但风险、监测强度、失败概率和时间焦虑通常明显上升。", cost: "代价包括更高频的产检、更高风险管理成本；若生育力下降，还可能进入辅助生殖路径，带来时间、金钱和情绪消耗。", extra: "这不是法律禁止，而是生理规律驱动的窗口；男性也受年龄影响，但制度上最明确的分界通常集中在女性35岁以上孕产风险管理。" },
  { title: "养老保险起缴窗口", type: "制度窗口", suggested: "工作早期尽早开始", detail: "我国延迟退休改革已明确，自2030年起按月领取基本养老金的最低缴费年限将从15年逐步提高到20年。", limit: "起缴太晚，到退休年龄时可能年限不足，无法按月领取养老金。", cost: "代价是需要补缴、延长缴费或调整退休安排；越晚补，现金流压力越大。", extra: "年轻时不显眼，但中年后常会突然变成硬性压力。" },
  { title: "法定退休年龄窗口", type: "硬门槛（渐进调整中）", suggested: "2025年起逐步后移", detail: "自2025年1月1日起实施渐进式延迟退休，男职工退休年龄逐步从60岁延至63岁；原50岁退休女职工逐步延至55岁，原55岁退休女职工逐步延至58岁。", limit: "退休不再是固定‘到点就退’，个人职业、社保、家庭照护安排都要重新计算。", cost: "代价主要是职业规划被迫拉长；如果前期没有做好社保和健康准备，后面会更被动。", extra: "今后谈退休年龄必须结合出生时间和政策对照表，旧经验正在失效。" },
  { title: "视力保护与近视干预窗口", type: "生理窗口", suggested: "6至15岁重点关注", detail: "儿童青少年近视一旦形成往往难以逆转，早期控制用眼习惯和户外时间更有效。", limit: "错过早期干预后，度数通常更容易持续上升，高中以后再纠偏空间有限。", cost: "代价主要是长期配镜、复查和生活便利性下降；严重者还会影响部分专业和职业选择。", extra: "对升学阶段尤其隐蔽，但影响可能持续几十年。" },
  { title: "青春期身高与骨骼发育窗口", type: "生理窗口", suggested: "青春期前后几年", detail: "营养、睡眠、运动和内分泌状态会在骨骼快速发育期集中体现。", limit: "骨骺闭合后，身高和部分骨骼发育空间基本消失。", cost: "代价通常不是花钱就能补回来，而是窗口过去后生理空间显著变小。", extra: "如果存在明显发育异常，越晚发现越被动。" },
  { title: "中考分流窗口", type: "制度窗口", suggested: "初三前后", detail: "中考在很多地区直接影响普通高中、职业教育和后续升学路径分流。", limit: "一旦进入不同轨道，后续再转换通常可行但成本明显更高。", cost: "代价主要是重新考试、转轨准备和时间损耗，且可选路径会减少。", extra: "这是中国教育体系中第一次大规模制度分流窗口。" },
  { title: "高考志愿决策窗口", type: "制度窗口", suggested: "高三出分后短时间内", detail: "院校、专业、城市和批次选择会共同影响未来的人脉、行业入口和迁移成本。", limit: "错过填报质量窗口后，即使分数不低，也可能进入不匹配的学校或专业。", cost: "代价不是简单复读成本，而是几年时间、机会成本和路径依赖。", extra: "这是典型信息差决定结果上限的窗口。" },
  { title: "大学转专业窗口", type: "制度窗口", suggested: "大一至大二最关键", detail: "多数高校转专业都有申请时间、成绩和名额限制，越早调整越容易。", limit: "拖到后期再换专业，学分衔接、培养方案和毕业进度都会受影响。", cost: "代价主要是补修课程、延毕风险和求职叙事不连贯。", extra: "对高考志愿失误者尤其重要。" },
  { title: "英语与通用能力打底窗口", type: "发展窗口", suggested: "大学前两年或职业早期", detail: "英语、写作、表达、检索和办公软件能力越早形成，后续复利越强。", limit: "一旦进入高负荷工作阶段，再补这些底层能力常常被碎片化打断。", cost: "代价是后期需要用大量零散时间补基础，还会错过很多机会型岗位。", extra: "这类能力平时不显山露水，但在求职和晋升时会突然拉开差距。" },
  { title: "第一段实习窗口", type: "现实窗口", suggested: "大学二三年级最关键", detail: "很多高质量实习更偏好在校生，越早拿到第一段实习，后续越容易滚出第二段第三段。", limit: "临近毕业才开始补实习，会发现很多岗位更看重既有经历而不是单次潜力。", cost: "代价主要是简历起点过低，校招时很难讲出清晰的能力故事。", extra: "这是职业履历的起跑器窗口。" },
  { title: "保研资格窗口", type: "制度窗口", suggested: "大学前三年持续积累", detail: "保研名额通常取决于前期成绩、科研、竞赛和综合表现，最后一年临时冲刺空间有限。", limit: "一旦排名和关键成果在评定前没有建立，保研机会往往直接消失。", cost: "代价是只能改走考研或就业路线，时间和不确定性显著上升。", extra: "这是典型‘过程决定结果’的窗口。" },
  { title: "考研备考窗口", type: "现实窗口", suggested: "大三下至大四上", detail: "考研不仅是分数竞争，还受到目标院校、专业课跨度和信息获取效率影响。", limit: "准备过晚容易陷入题海和情绪波动，难以兼顾实习、毕业和考试。", cost: "代价主要是复习效率低、二战风险上升以及毕业去向承压。", extra: "越跨专业、越冲名校，越依赖提前布局。" },
  { title: "留学申请窗口", type: "制度窗口", suggested: "入学前1至2年", detail: "语言成绩、推荐信、实习科研和申请文书通常都需要提前准备。", limit: "错过关键申请季后，往往只能延后整整一学年再申请。", cost: "代价通常是一整年时间、更多申请成本和计划重排。", extra: "这类窗口的本质是全球招生周期，不会因为个人准备不足而等待。" },
  { title: "职业资格取证窗口", type: "制度与现实混合窗口", suggested: "大学后期到工作前期", detail: "教师、法律、会计、金融、建造等不少职业路径都依赖证书或考试资格。", limit: "越晚准备，越容易被工作节奏挤压，甚至因专业、年限或岗位条件受限。", cost: "代价主要是备考时间被压缩，转行门槛显著升高。", extra: "证书不一定决定上限，但常常决定能否进场。" },
  { title: "第一份工作定型窗口", type: "现实窗口", suggested: "毕业后前2至3年", detail: "职业起点会影响技能栈、行业语言、社交圈和下一份工作的匹配方式。", limit: "起步如果偏离过远，后续再切换赛道需要额外证明自己不是‘从零开始’。", cost: "代价主要是降薪转岗、补作品集、补项目经历和承受更高试错成本。", extra: "第一份工作不是终局，但它经常决定第二份工作给不给你机会。" },
  { title: "试用期表现窗口", type: "现实中的准硬门槛", suggested: "入职前3至6个月", detail: "很多团队会在试用期快速判断稳定性、学习速度、沟通方式和责任感。", limit: "试用期评价不佳，往往无法进入长期培养名单，甚至直接终止合作。", cost: "代价主要是简历出现短履历、心理受挫以及重新找工作的时间成本。", extra: "这段时间常常比入职后的普通月份更能决定后续信任程度。" },
  { title: "行业转型学习窗口", type: "现实窗口", suggested: "行业景气下行初期就要启动", detail: "当行业明显收缩时，越早补新技能、换赛道、换城市，越有主动性。", limit: "等到失业或大规模裁员后再转向，竞争会更拥挤，议价能力更弱。", cost: "代价主要是收入下滑、空窗期拉长和身份焦虑加重。", extra: "很多转型不是输在能力，而是输在启动太晚。" },
  { title: "管理岗位跃迁窗口", type: "现实窗口", suggested: "工作5至10年常见", detail: "从个人贡献者走向带团队，通常需要在某个阶段形成项目统筹、跨部门沟通和结果负责能力。", limit: "如果长期只做执行而不承担协同责任，后续晋升管理岗会越来越难。", cost: "代价主要是需要补管理经验，但管理经验又往往只给已经被信任的人。", extra: "这是职场中的典型‘角色切换窗口’。" },
  { title: "创业低成本试错窗口", type: "现实窗口", suggested: "负担较轻的青年阶段更常见", detail: "创业并非只看年龄，但在家庭负担、固定开支和路径沉没成本较低时，试错弹性通常更大。", limit: "随着房贷、育儿和赡养压力上升，同样的创业失败代价会被放大。", cost: "代价主要是机会成本、现金流压力和家庭系统承压。", extra: "这不是鼓励盲目创业，而是提示风险承受能力本身也有时间结构。" },
  { title: "城市落户与资格获取窗口", type: "制度窗口", suggested: "升学就业初期最关键", detail: "不少城市的人才引进、积分落户、购房资格和公共服务接入，都更偏好学历新鲜、就业稳定和社保连续的人群。", limit: "错过早期进入窗口后，后续落户、子女教育和公共资源获取的门槛可能明显上升。", cost: "代价主要是需要更长时间累计积分、社保和居住年限。", extra: "不同城市规则差异很大，但共同点都是越晚越被动。" },
  { title: "社保连续缴纳窗口", type: "制度窗口", suggested: "就业起步后尽量保持连续", detail: "医疗、购房、落户、生育、失业等不少资格都和连续缴纳社保有关。", limit: "一旦中断过多，部分资格会重新计算或延后满足。", cost: "代价主要是等待期拉长、补缴受限以及资格链条断裂。", extra: "社保不是单一账户，而是一整套长期资格系统。" },
  { title: "住房公积金积累窗口", type: "制度窗口", suggested: "就业早期尽早建立", detail: "公积金贷款额度、贷款资格和月供压力往往与缴存年限和余额密切相关。", limit: "起步过晚或频繁中断，会削弱后续住房融资能力。", cost: "代价主要是被迫更多依赖商业贷款，长期利息支出更高。", extra: "对计划买房的人，这是一个长期缓慢生效的窗口。" },
  { title: "首套房资格利用窗口", type: "制度与现实混合窗口", suggested: "家庭资产形成前期", detail: "很多家庭第一次购房时的首付比例、贷款政策、税费安排和资格认定更有优势。", limit: "如果因为决策拖延或资格使用不当错过首套身份，后续置业成本可能明显上升。", cost: "代价主要是更高首付、更高利率或税费，以及更紧的现金流。", extra: "这类窗口强依赖地方政策，但‘首套资格稀缺’这一点通常成立。" },
  { title: "个人征信建立窗口", type: "现实中的准硬门槛", suggested: "18岁后尽早规范", detail: "信用卡、消费贷、房贷和部分租赁金融服务都会参考个人征信记录。", limit: "长期没有信用记录或早期就出现逾期，都会影响后续融资便利性和成本。", cost: "代价主要是更高利率、更低额度以及重要申请被拒。", extra: "征信的特点不是一次性惩罚，而是会影响后续多个环节。" },
  { title: "婚恋匹配窗口", type: "现实窗口", suggested: "25至35岁通常更密集", detail: "多数人的稳定社交圈、择偶市场活跃度和家庭规划讨论，会在这一阶段更集中。", limit: "并非过了就无法建立关系，但主动结识、筛选和协商成本往往会上升。", cost: "代价主要是时间焦虑、选择空间收缩和家庭节奏被动后移。", extra: "这是社会结构形成的现实窗口，不是价值判断。" },
  { title: "重大疾病筛查窗口", type: "健康窗口", suggested: "30岁后定期建立", detail: "血压、血糖、血脂、甲状腺、乳腺、宫颈、肠胃等问题很多在早筛阶段成本最低。", limit: "若长期不筛查，很多疾病会在有症状时才被发现，治疗成本和损伤程度都会上升。", cost: "代价主要是更高医疗费用、更长恢复期和生活质量受损。", extra: "健康管理的核心往往不是治疗，而是提早发现。" },
  { title: "口腔矫正与牙周维护窗口", type: "健康窗口", suggested: "青少年至青年期更有利", detail: "牙列不齐、龋齿、牙周问题越早处理，治疗方案通常越简单。", limit: "拖到后期，矫正时间、牙周风险和修复复杂度都会增加。", cost: "代价主要是更长疗程、更高费用以及更多不适感。", extra: "牙齿问题常常是典型的小拖大。" },
  { title: "体重与代谢控制窗口", type: "健康窗口", suggested: "20至35岁尽早建立", detail: "年轻阶段建立饮食、睡眠和运动秩序，对后续代谢健康影响很大。", limit: "长期肥胖、熬夜和久坐一旦固化，中年后逆转会明显更难。", cost: "代价主要是减重难度增加、慢病风险上升和精力下降。", extra: "很多人真正感受到代价时，往往已经过了最容易调整的阶段。" },
  { title: "长期伴侣与生育协同窗口", type: "现实与生理混合窗口", suggested: "30岁前后需尽早对齐", detail: "婚姻、生育、职业和城市选择往往不是单独决策，而是需要双方节奏配合。", limit: "如果长期不对齐，常会在生育、买房、工作调动等节点集中爆发冲突。", cost: "代价主要是关系磨损、计划重做和时间被动流失。", extra: "很多问题不是没有答案，而是答案来得太晚。" },
  { title: "父母养老准备窗口", type: "家庭责任窗口", suggested: "自己30岁后尽早启动", detail: "父母进入退休与高龄阶段前，越早梳理医保、养老金、住房、照护责任和兄弟姐妹分工，后期越稳。", limit: "拖到突发疾病或失能后再协调，往往只能在高压中做低质量决策。", cost: "代价主要是现金流冲击、家庭冲突和照护疲劳。", extra: "这是中青年最容易忽视、但一旦到来就很重的窗口。" },
  { title: "复利储蓄与投资窗口", type: "财务窗口", suggested: "第一份稳定收入开始", detail: "长期储蓄和复利更依赖启动时间，而不只是单次收益率。", limit: "起步过晚会让后期必须用更高储蓄率去追赶同样目标。", cost: "代价主要是现金流紧绷、风险偏好被迫升高以及退休准备不足。", extra: "个人财务里最难补的通常不是技巧，而是时间。" },
  { title: "核心人脉建立窗口", type: "现实窗口", suggested: "校园后期到职业前10年", detail: "同学、同事、合作方和导师关系在早期形成时更自然，也更容易长期积累信任。", limit: "等到明确需要资源时再临时经营关系，往往效率低且信任弱。", cost: "代价主要是合作机会少、信息获取慢和关键节点缺少支持者。", extra: "人脉的本质不是认识很多人，而是长期可信的连接。" }
];

const rangeMeta = {
  "小学入学窗口": { start: 6, end: 7 },
  "合法就业起点": { start: 16, end: 18 },
  "成年与独立民事能力窗口": { start: 18, end: 22 },
  "驾照与基础流动性窗口": { start: 18, end: 26 },
  "法定结婚年龄窗口": { start: 20, end: 30 },
  "征兵窗口": { start: 18, end: 26 },
  "应届生身份窗口": { start: 22, end: 26 },
  "公务员报考年龄窗口": { start: 18, end: 38 },
  "生育力与妊娠风险窗口（尤其女性）": { start: 24, end: 35 },
  "养老保险起缴窗口": { start: 22, end: 35 },
  "法定退休年龄窗口": { start: 55, end: 63 },
  "视力保护与近视干预窗口": { start: 6, end: 15 },
  "青春期身高与骨骼发育窗口": { start: 10, end: 16 },
  "中考分流窗口": { start: 14, end: 16 },
  "高考志愿决策窗口": { start: 17, end: 19 },
  "大学转专业窗口": { start: 18, end: 20 },
  "英语与通用能力打底窗口": { start: 18, end: 25 },
  "第一段实习窗口": { start: 19, end: 22 },
  "保研资格窗口": { start: 18, end: 21 },
  "考研备考窗口": { start: 20, end: 23 },
  "留学申请窗口": { start: 18, end: 24 },
  "职业资格取证窗口": { start: 20, end: 28 },
  "第一份工作定型窗口": { start: 22, end: 26 },
  "试用期表现窗口": { start: 22, end: 24 },
  "行业转型学习窗口": { start: 28, end: 40 },
  "管理岗位跃迁窗口": { start: 28, end: 38 },
  "创业低成本试错窗口": { start: 24, end: 35 },
  "城市落户与资格获取窗口": { start: 22, end: 32 },
  "社保连续缴纳窗口": { start: 22, end: 35 },
  "住房公积金积累窗口": { start: 22, end: 35 },
  "首套房资格利用窗口": { start: 26, end: 35 },
  "个人征信建立窗口": { start: 18, end: 30 },
  "婚恋匹配窗口": { start: 25, end: 35 },
  "重大疾病筛查窗口": { start: 30, end: 55 },
  "口腔矫正与牙周维护窗口": { start: 12, end: 28 },
  "体重与代谢控制窗口": { start: 20, end: 35 },
  "长期伴侣与生育协同窗口": { start: 27, end: 35 },
  "父母养老准备窗口": { start: 30, end: 45 },
  "复利储蓄与投资窗口": { start: 22, end: 35 },
  "核心人脉建立窗口": { start: 18, end: 32 }
};

const categoryRules = [
  { test: /(小学|中考|高考|大学|保研|考研|留学|英语|实习)/, value: "教育/跃迁" },
  { test: /(就业|公务员|工作|试用期|转型|管理岗位|创业|职业资格)/, value: "职业/路径" },
  { test: /(成年|驾照|结婚|征兵|养老保险|退休|落户|社保|公积金|首套房|征信)/, value: "制度/资格" },
  { test: /(生育力|视力|身高|疾病|口腔|体重)/, value: "健康/生理" },
  { test: /(婚恋|伴侣|父母养老|人脉)/, value: "关系/家庭" },
  { test: /(储蓄|投资)/, value: "财务/复利" }
];

const summaryStrip = document.querySelector("#summary-strip");
const cardGrid = document.querySelector("#card-grid");
const cardTemplate = document.querySelector("#window-card-template");
const ageSlider = document.querySelector("#age-slider");
const ageCaption = document.querySelector("#age-caption");
const stateFilterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const categoryFilterButtons = Array.from(document.querySelectorAll("[data-category-filter]"));
const showAllButton = document.querySelector("#show-all-btn");
const hideAllButton = document.querySelector("#hide-all-btn");
const resetFilterButton = document.querySelector("#reset-filter-btn");
const themeButtons = Array.from(document.querySelectorAll("[data-theme-mode]"));
const allStates = ["upcoming", "open", "closing", "closed"];
const allCategories = ["教育/跃迁", "职业/路径", "制度/资格", "健康/生理", "关系/家庭", "财务/复利"];
const activeFilters = new Set(["upcoming", "open", "closing", "closed"]);
const activeCategories = new Set(allCategories);
const themeStorageKey = "life-window-theme";
const expandedCardsStorageKey = "life-window-expanded-cards";
let masonryRafId = 0;
let cardResizeObserver;
let hasCompletedInitialLayout = false;
let suppressMoveAnimation = false;
let pendingAnimationRects = null;
let pendingLayoutMotion = "settle";

function captureCardRects() {
  return new Map(
    Array.from(cardGrid.querySelectorAll(".window-card")).map((card) => [card, card.getBoundingClientRect()])
  );
}

function inferCategory(title) {
  const matched = categoryRules.find((rule) => rule.test.test(title));
  return matched ? matched.value : "综合/其他";
}

function scoreStrength(type) {
  if (type.includes("硬门槛")) return 92;
  if (type.includes("制度")) return 86;
  if (type.includes("生理")) return 82;
  if (type.includes("健康")) return 78;
  if (type.includes("家庭责任")) return 74;
  return 72;
}

function scoreCost(text) {
  if (/(极高|整年|直接关闭|很难|高频|高风险|显著)/.test(text)) return "高";
  if (/(更高|拉长|缩小|压缩|下降|受限|等待期)/.test(text)) return "中";
  return "低";
}

function getState(age, start, end) {
  if (age < start) return "upcoming";
  if (age > end) return "closed";
  if (age >= end - Math.max(1, Math.round((end - start) * 0.25))) return "closing";
  return "open";
}

function getStateLabel(state) {
  return {
    upcoming: "尚未开启",
    open: "窗口开启",
    closing: "即将关闭",
    closed: "已关闭"
  }[state];
}

function getStateNote(item, age) {
  const { start, end } = item.range;
  const gapToStart = start - age;
  const gapToEnd = end - age;

  if (age < start) {
    return `距离参考开启点还有 ${gapToStart} 年。当前更适合提前储备信息、能力或资源，不必急着硬撞窗口。`;
  }

  if (age > end) {
    return `参考窗口已过去 ${age - end} 年。此时更现实的策略通常不是回到原赛道起点，而是接受补偿成本，寻找替代路径。`;
  }

  if (gapToEnd <= Math.max(1, Math.round((end - start) * 0.25))) {
    return `窗口仍在，但已经进入后段，离参考关闭点只剩 ${gapToEnd} 年。现在最重要的是减少犹豫，尽快完成关键决策。`;
  }

  return `当前年龄仍处在相对主动的区间内。这个阶段越早布局，后续越容易拿到更低成本、更高确定性的结果。`;
}

function normalize(value) {
  return `${(value / maxAge) * 100}%`;
}

function getStoredTheme() {
  return localStorage.getItem(themeStorageKey) || "auto";
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "auto") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", mode);
  }

  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeMode === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setTheme(mode) {
  localStorage.setItem(themeStorageKey, mode);
  applyTheme(mode);
}

function getExpandedCards() {
  try {
    return JSON.parse(localStorage.getItem(expandedCardsStorageKey) || "{}");
  } catch {
    return {};
  }
}

function setCardExpandedState(title, expanded) {
  const current = getExpandedCards();
  current[title] = expanded;
  localStorage.setItem(expandedCardsStorageKey, JSON.stringify(current));
}

function isCardExpanded(title) {
  return Boolean(getExpandedCards()[title]);
}

function scheduleMasonryLayout(animate = !suppressMoveAnimation, firstRects = null, motion = "settle") {
  if (firstRects) {
    pendingAnimationRects = firstRects;
  }
  pendingLayoutMotion = motion;
  cancelAnimationFrame(masonryRafId);
  masonryRafId = requestAnimationFrame(() => applyMasonryLayout(animate, pendingAnimationRects, pendingLayoutMotion));
}

function observeCardSizes() {
  if (cardResizeObserver) {
    cardResizeObserver.disconnect();
  }

  cardResizeObserver = new ResizeObserver(() => {
    Array.from(cardGrid.querySelectorAll(".card-details:not([hidden])")).forEach((details) => {
      details.style.maxHeight = `${details.scrollHeight}px`;
    });
    scheduleMasonryLayout(!suppressMoveAnimation);
  });

  Array.from(cardGrid.querySelectorAll(".window-card")).forEach((card) => {
    cardResizeObserver.observe(card);
  });
}

function applyMasonryLayout(animate = true, firstRectsOverride = null, motion = "settle") {
  const cards = Array.from(cardGrid.querySelectorAll(".window-card"));
  if (!cards.length) return;

  const firstRects = firstRectsOverride || new Map(
    cards.map((card) => [card, card.getBoundingClientRect()])
  );
  pendingAnimationRects = null;

  const styles = window.getComputedStyle(cardGrid);
  const autoRow = parseFloat(styles.getPropertyValue("grid-auto-rows"));
  const rowGap = parseFloat(styles.getPropertyValue("gap"));

  if (!Number.isFinite(autoRow) || autoRow <= 0) {
    cards.forEach((card) => {
      card.style.gridRowEnd = "";
    });
    return;
  }

  cards.forEach((card) => {
    const height = card.getBoundingClientRect().height;
    const span = Math.max(1, Math.ceil((height + rowGap) / (autoRow + rowGap)));
    card.style.gridRowEnd = `span ${span}`;
  });

  if (!hasCompletedInitialLayout) {
    hasCompletedInitialLayout = true;
    return;
  }

  if (!animate) {
    return;
  }

  cards.forEach((card) => {
    const first = firstRects.get(card);
    const last = card.getBoundingClientRect();
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;

    if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) {
      return;
    }

    card.getAnimations().forEach((animation) => animation.cancel());
    const timing = motion === "collapse"
      ? { duration: 620, easing: "cubic-bezier(0.16, 0.84, 0.24, 1)" }
      : motion === "expand"
        ? { duration: 480, easing: "cubic-bezier(0.2, 0.9, 0.22, 1)" }
        : { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" };
    card.animate(
      [
        { transform: `translate(${deltaX}px, ${deltaY}px)` },
        { transform: "translate(0, 0)" }
      ],
      {
        duration: timing.duration,
        easing: timing.easing,
        fill: "both"
      }
    );
  });
}

function setDetailsState(card, details, expandButton, expanded, immediate = false) {
  card.classList.toggle("is-expanded", expanded);
  card.classList.remove("is-collapsing");
  expandButton.setAttribute("aria-expanded", String(expanded));
  expandButton.textContent = expanded ? "收起详情" : "展开详情";

  if (immediate) {
    details.hidden = !expanded;
    details.style.opacity = expanded ? "1" : "0";
    details.style.maxHeight = expanded ? `${details.scrollHeight}px` : "0px";
    details.style.transition = "max-height 0ms linear, opacity 0ms linear";
    card.style.gridRowEnd = "";
    scheduleMasonryLayout(false);
    return;
  }

  if (expanded) {
    const initialRects = captureCardRects();
    suppressMoveAnimation = true;
    details.hidden = false;
    card.classList.remove("is-collapsing");
    details.style.transition = "max-height 460ms cubic-bezier(0.2, 0.86, 0.22, 1), opacity 280ms ease";
    details.style.opacity = "0";
    details.style.maxHeight = "0px";
    void details.offsetHeight;
    details.style.opacity = "1";
    details.style.maxHeight = `${details.scrollHeight}px`;

    // Animate sibling cards toward their final slots while the detail panel expands.
    scheduleMasonryLayout(true, initialRects, "expand");

    const onExpandEnd = (event) => {
      if (event.propertyName !== "max-height") return;
      details.style.maxHeight = `${details.scrollHeight}px`;
      details.removeEventListener("transitionend", onExpandEnd);
      card.style.gridRowEnd = "";
      suppressMoveAnimation = false;
      card.classList.remove("is-collapsing");
      scheduleMasonryLayout(false, null, "settle");
    };

    details.addEventListener("transitionend", onExpandEnd);
    return;
  }

  const initialRects = captureCardRects();
  suppressMoveAnimation = true;
  details.hidden = false;
  card.classList.add("is-collapsing");
  details.style.transition = "max-height 620ms cubic-bezier(0.16, 0.84, 0.24, 1), opacity 320ms ease";
  details.style.maxHeight = `${details.scrollHeight}px`;
  details.style.opacity = "1";
  void details.offsetHeight;
  details.style.maxHeight = "0px";
  details.style.opacity = "0";

  // Animate sibling cards toward their collapsed slots while the detail panel closes.
  scheduleMasonryLayout(true, initialRects, "collapse");

  const onCollapseEnd = (event) => {
    if (event.propertyName !== "max-height") return;
    details.hidden = true;
    details.style.maxHeight = "0px";
    card.style.gridRowEnd = "";
    card.classList.remove("is-collapsing");
    details.removeEventListener("transitionend", onCollapseEnd);
    suppressMoveAnimation = false;
    scheduleMasonryLayout(false, null, "settle");
  };

  details.addEventListener("transitionend", onCollapseEnd);
}

const enrichedData = baseData.map((item) => {
  const range = rangeMeta[item.title] || { start: 18, end: 30 };
  return {
    ...item,
    range,
    category: inferCategory(item.title),
    strength: scoreStrength(item.type),
    costLevel: scoreCost(item.cost)
  };
});

function buildSummary(age) {
  const states = { upcoming: 0, open: 0, closing: 0, closed: 0 };
  enrichedData.forEach((item) => {
    states[getState(age, item.range.start, item.range.end)] += 1;
  });

  summaryStrip.innerHTML = [
    { key: "open", label: "仍处在主动区", hint: "现在推进最划算" },
    { key: "closing", label: "逼近关闭", hint: "最值得优先处理" },
    { key: "upcoming", label: "尚未开启", hint: "适合提前准备" },
    { key: "closed", label: "已经错过", hint: "需要补偿或替代路径" }
  ].map((item) => `
    <div class="summary-card summary-card-${item.key}">
      <span>${item.label}</span>
      <strong>${states[item.key]}</strong>
      <span>${item.hint}</span>
    </div>
  `).join("");
}

function renderCards(age) {
  const sorted = enrichedData
    .map((item) => ({
      ...item,
      state: getState(age, item.range.start, item.range.end),
      distance: age < item.range.start ? item.range.start - age : age > item.range.end ? age - item.range.end : 0
    }))
    .sort((a, b) => {
      const order = { closing: 0, open: 1, upcoming: 2, closed: 3 };
      return order[a.state] - order[b.state] || a.distance - b.distance || a.range.start - b.range.start;
    });

  cardGrid.innerHTML = "";

  const visibleItems = sorted.filter((item) => activeFilters.has(item.state) && activeCategories.has(item.category));

  if (visibleItems.length === 0) {
    cardGrid.innerHTML = `
      <article class="window-card">
        <div class="card-top">
          <span class="state-badge">暂无结果</span>
          <span class="category-chip">筛选提示</span>
        </div>
        <h2 class="card-title">当前没有匹配的窗口</h2>
        <p class="card-body">你已经把这四种状态全部取消了，或者当前组合下没有符合条件的卡片。重新点亮一个或多个状态按钮，就能恢复展示。</p>
      </article>
    `;
    scheduleMasonryLayout(false);
    return;
  }

  visibleItems.forEach((item) => {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.state = item.state;
    node.style.setProperty("--start", normalize(item.range.start));
    node.style.setProperty("--end", normalize(item.range.end));
    node.style.setProperty("--anchor", normalize(age));

    node.querySelector(".card-title").textContent = item.title;
    node.querySelector(".range-value").textContent = `${item.range.start}-${item.range.end} 岁`;
    node.querySelector(".metric-strength").textContent = `${item.strength}%`;

    const metricCost = node.querySelector(".metric-cost");
    metricCost.textContent = item.costLevel;
    metricCost.dataset.level = item.costLevel;

    node.querySelector(".state-badge").textContent = getStateLabel(item.state);
    node.querySelector(".category-chip").textContent = item.category;
    node.querySelector(".card-body").textContent = item.detail;
    node.querySelector(".status-note").textContent = getStateNote(item, age);

    const expandButton = node.querySelector(".expand-button");
    const details = node.querySelector(".card-details");
    const expanded = isCardExpanded(item.title);
    setDetailsState(node, details, expandButton, expanded, true);

    expandButton.addEventListener("click", () => {
      const currentExpanded = expandButton.getAttribute("aria-expanded") === "true";
      const nextExpanded = !currentExpanded;
      setDetailsState(node, details, expandButton, nextExpanded);
      setCardExpandedState(item.title, nextExpanded);
    });

    node.querySelector(".detail-type").textContent = `${item.type} · 建议时间：${item.suggested}`;
    node.querySelector(".detail-limit").textContent = item.limit;
    node.querySelector(".detail-extra").textContent = item.extra;

    cardGrid.appendChild(node);
  });

  observeCardSizes();
  scheduleMasonryLayout(false);
}

function syncFilterButtons() {
  stateFilterButtons.forEach((button) => {
    const isActive = activeFilters.has(button.dataset.filter);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  categoryFilterButtons.forEach((button) => {
    const isActive = activeCategories.has(button.dataset.categoryFilter);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function toggleFilter(filter) {
  if (activeFilters.has(filter)) {
    if (activeFilters.size === 1) {
      return;
    }
    activeFilters.delete(filter);
  } else {
    activeFilters.add(filter);
  }

  syncFilterButtons();
  renderCards(Number(ageSlider.value));
}

function toggleCategoryFilter(category) {
  if (activeCategories.has(category)) {
    if (activeCategories.size === 1) {
      return;
    }
    activeCategories.delete(category);
  } else {
    activeCategories.add(category);
  }

  syncFilterButtons();
  renderCards(Number(ageSlider.value));
}

function setAllFilters(active) {
  activeFilters.clear();
  activeCategories.clear();
  if (active) {
    allStates.forEach((state) => activeFilters.add(state));
    allCategories.forEach((category) => activeCategories.add(category));
  } else {
    activeFilters.add("open");
    activeCategories.add("健康/生理");
  }
  syncFilterButtons();
  renderCards(Number(ageSlider.value));
}

function resetFilters() {
  activeFilters.clear();
  activeCategories.clear();
  allStates.forEach((state) => activeFilters.add(state));
  allCategories.forEach((category) => activeCategories.add(category));
  syncFilterButtons();
  renderCards(Number(ageSlider.value));
}

function updateAgeView() {
  const age = Number(ageSlider.value);
  const progress = `${((age - Number(ageSlider.min)) / (Number(ageSlider.max) - Number(ageSlider.min))) * 100}%`;
  ageSlider.style.setProperty("--progress", progress);
  ageCaption.textContent = `${age} 岁`;
  buildSummary(age);
  renderCards(age);
}

ageSlider.addEventListener("input", updateAgeView);
stateFilterButtons.forEach((button) => {
  button.addEventListener("click", () => toggleFilter(button.dataset.filter));
});
categoryFilterButtons.forEach((button) => {
  button.addEventListener("click", () => toggleCategoryFilter(button.dataset.categoryFilter));
});
showAllButton.addEventListener("click", () => setAllFilters(true));
hideAllButton.addEventListener("click", () => setAllFilters(false));
resetFilterButton.addEventListener("click", resetFilters);
themeButtons.forEach((button) => {
  button.addEventListener("click", () => setTheme(button.dataset.themeMode));
});
window.addEventListener("resize", () => scheduleMasonryLayout(false));
applyTheme(getStoredTheme());
syncFilterButtons();
updateAgeView();
