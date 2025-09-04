<template>
	<div>
		<div class="flex-col justify-start page">
			<div class="flex-col group">
				<div class=" items-start group_3" v-if="IdentifyHistory?.length !== 0">
					<div class="font_1 text_3">{{ getdate() }}</div>
					<div class="flex-row" style="flex-wrap: wrap;">
						<img class="section" :src="item.image" @click="goto(item.data)"
							v-for="(item, index) in IdentifyHistory" :key="index"></img>

					</div>
				</div>
				<div class=" items-start group_3">
					<div class="font_1 text_3">7月23日</div>
					<div class="flex-row">
						<img class="section" :src="item.image" @click="goto(item.data)" v-for="(item, index) in list1"
							:key="index"></img>
					</div>
				</div>

				<div class=" items-start group_3">
					<div class="font_1 text_3">6月26日</div>
					<div class="flex-row">
						<img class="section" :src="item.image" @click="goto(item.data)" v-for="(item, index) in list2"
							:key="index"></img>
					</div>
				</div>


			</div>

		</div>
	</div>
</template>

<script setup>
import useUserInfoStore from "@/store/user.js";
import { storeToRefs } from "pinia";

const userInfoStore = useUserInfoStore();
const { IdentifyHistory } = storeToRefs(userInfoStore);

const getdate = () => {
	const now = new Date();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	return `${month}月${day}日`
}
// list: getApp().globalData.IdentificationHistory,
const list1 = [
	{
		"image": "src/assets/images/user/identifyhistory/3/1.jpg",
		"data": [
			{
				"score": "0.429",
				"name": "锦鲤",
				"baike_info": {
					"baike_url": "http://baike.baidu.com/item/%E9%94%A6%E9%B2%A4/311179",
					"image_url": "src/assets/images/user/identifyhistory/3/2.jpg",
					"description": "锦鲤，是鲤形目鲤科鲤属的鱼类动物。锦鲤至今已大约有100个品种。锦鲤是鲤鱼的变种，体形和鲤鱼相似，介于鲤、鲩之间，体躯侧扁呈纺锤形，个体较大；头部前端有吻须两对，身上有绚丽的色彩和变幻多姿的斑纹。锦鲤原产地在中亚细亚，后来传到了中国，再由中国传入日本。锦鲤对水温、水质的要求不严，适于生活在微碱性、硬度低的水质环境中。锦鲤生性温和，喜群游，易饲养；杂食性，一般采食软体动物、高等水生植物碎片、底栖动物以至细小的藻类或人工合成颗粒饵料。锦鲤性成熟为2-3龄，每年4-5月产卵，寿命长，平均约70岁。锦鲤是一种高档观赏鱼，有“水中活宝石”的美称。锦鲤在中国最早仅饲养于皇宫贵族和达官显贵的宅邸，后来逐渐被饲养于寺院中，普通平民难得一见，因此被蒙上一层神秘色彩。锦鲤是日本的国鱼，色彩鲜艳、变化多端，游姿飘逸，观赏价值高，被称作“会游泳的艺术品”。在中国，锦鲤有飞黄腾达的寓意，所以被很多人饲养于庭院里或者水族箱中，是十分受欢迎的鱼类宠物。"
				}
			},
			{
				"score": "0.311",
				"name": "大正三色锦鲤",
				"baike_info": {
					"baike_url": "http://baike.baidu.com/item/%E5%A4%A7%E6%AD%A3%E4%B8%89%E8%89%B2%E9%94%A6%E9%B2%A4/4450814",
					"image_url": "src/assets/images/user/identifyhistory/3/3.jpg",
					"description": "大正三色锦鲤是指早在公元1900年的日本大正时代，日本新泻地区的鲤师们就在红白的基础上培育出带有墨色色斑的红、白、黑三色锦鲤。因其出于大正时代故命名为大正三色。白底上有红色及黑色斑纹者称为“大正三色”。头部只有红斑而无黑斑，胸鳍上有黑色条纹者为基本条件。与红白同为锦鲤的代表品种。"
				}
			},
			{
				"score": "0.019",
				"name": "日本锦鲤",
				"baike_info": {
					"baike_url": "http://baike.baidu.com/item/%E6%97%A5%E6%9C%AC%E9%94%A6%E9%B2%A4/100387",
					"image_url": "src/assets/images/user/identifyhistory/3/4.jpg",
					"description": "日本锦鲤，是鲤形目鲤科温带淡水鱼类。体较长，呈纺锤形，横断面呈椭圆形；有的体表全被光彩夺目的鳞片，也有与德国锦鲤杂交而成为少鳞甚至无鳞的品种；嘴边有两对胡须，其表皮含有类似味蕾的感觉细胞；嘴缘无齿，不过有发达的咽喉齿，可以咀嚼食物；舌头后面有5对鳃弧，最外侧的鳃弧；鳃瓣上布满无数的微血管，舌头后连着食道；没有胃，食道是直通肠的，食道实际是身长的5倍，卷曲在腹腔内。日本锦鲤起源地为日本新泻中区附近的山古志、鱼沼等地区。日本锦鲤生活在微碱性，硬度低的水质环境中；和金鱼一样对水温、水质的要求并不严格；在适宜的水中，游动活跃，食欲旺盛，体质健壮。日本锦鲤夏季捕食强度大，冬季几乎不进食；为杂食性，一般以软体动物，高等水生植物碎片，底栖动物以至细小的藻类为食。日本锦鲤每年性腺周期性地成熟1次，繁殖1次，产卵期一般在每年的4-6月，但日本南方也有秋季产卵繁殖的；通常可活60-70年。日本锦鲤身形健美、色彩艳丽、花纹多变、泳姿雄健，具有极高的观赏和饲养价值，是一种名贵的大型观赏鱼，在日本被誉为“活的艺术品”“水中活宝石”和“观赏鱼之王”。日本锦鲤曾是王公贵族专门饲养的“天之骄子”，一度价比黄金；后来成为大多数鱼友都愿意饲养，也能养得起的鱼种。日本锦鲤自古就被看作是龙的化身，还能够识别主人，可谓是美丽与智慧兼具。因此，日本锦鲤非常名贵，在日本地位很高。因其寿命长，在日本又有“祝鱼”“寿星鱼”的吉称。"
				}
			},
			{
				"score": "0.014",
				"name": "德国锦鲤",
				"baike_info": {
					"baike_url": "http://baike.baidu.com/item/%E5%BE%B7%E5%9B%BD%E9%94%A6%E9%B2%A4/7850447",
					"image_url": "src/assets/images/user/identifyhistory/3/5.jpg",
					"description": "德国锦鲤并非是原产自德国的锦鲤，而是德国产的革鲤与日本锦鲤杂交产生的锦鲤，它如今是日本锦鲤进行广泛杂交并繁育优质后代的确良主要亲本之一。根据观赏的要求，德国锦鲤分为四种，即革鲤、镜鲤、铠鲤和不规则鳞德国鲤。"
				}
			},
			{
				"score": "0.014",
				"name": "芒部锦鲤",
				"baike_info": {
					"baike_url": "http://baike.baidu.com/item/%E8%8A%92%E9%83%A8%E9%94%A6%E9%B2%A4/2553796",
					"image_url": "src/assets/images/user/identifyhistory/3/6.jpg",
					"description": "芒部锦鲤是观赏鱼，品种很多，但多为人工养殖培育的变种。镇雄县芒部镇青龙嘴山龙塘沟所产天然锦鲤鳞光耀眼，色彩艳丽，妙趣天成，是锦鲤中的珍品。"
				}
			}
		]
	}
]
const list2 = [{
	"image": "src/assets/images/user/identifyhistory/1/1.jpg",
	"data": [
		{
			"score": "0.947",
			"name": "萨摩耶",
			"baike_info": {
				"image_url": "src/assets/images/user/identifyhistory/1/2.jpg",
				"description": "萨摩耶犬(英文：Samoyed)，别称萨摩耶，原是西伯利亚的原住民萨摩耶族培育出的犬种。该犬全身长有浓密的被毛，毛长适中且直；头呈楔形；眼睛颜色深为佳，两眼凹陷，间距大，为杏仁形；鼻梁较长，鼻端、口周多呈黑色，嘴角上翘；直立的耳朵很厚，呈三角形，尖端略圆；脚大而长，比较平，似野兔的足，趾稍分开；趾尖呈拱形肉垫厚而硬，趾之间有保护的毛，脚圆形或似猫足。到了20世纪，它常被人们用于极地探险，并受到世界各地爱狗人士的喜欢。萨摩耶犬温和而友善，从不制造麻烦；它天生聪明，对主人绝对忠诚。同时，它身体强壮、奔跑速度快，适应性强，机警，充满活力，乐于服务，进攻性不强，这使得萨摩耶犬成为人类忠实的朋友与伴侣，并逐渐进入千家万户。萨摩耶犬不单单是宠物，它也是优秀的工作犬，它是极地探险的英雄，是危险之地营救的能手。在得到良好照顾的情况下，该犬一般寿命为12～14年左右。"
			}
		},
		{
			"score": "0.08",
			"name": "日本尖嘴犬",
			"baike_info": {
				"image_url": "src/assets/images/user/identifyhistory/1/3.jpg",
				"description": "银狐犬是食肉目犬科犬属哺乳动物，又名日本狐狸犬、日本尖嘴犬。身高25厘米—40厘米，被毛细密、柔软，颜色以纯白色为主；耳直立呈小三角形，被短的被毛遮盖；鼻小而尖，鼻端呈黑色；黑色的眼睛圆大而略呈三角形；唇黑而不松弛，牙齿粗壮坚实，呈剪式咬合；尾为覆盖长饰毛的卷尾，始终卷曲于背上，尾根高；足爪圆且紧凑，猫形趾，趾间饰毛丰富。寿命12年—13年。银狐犬原产于日本。银狐犬每日需摄食250—300克肉类，另外加等量的干素料或饼干；肉与干素料均需先煮熟，切碎用少量水拌匀后喂食；每天需喂水2—3次；食物温度不可高于犬的体温。雄狗繁殖合适年龄为1.5—2岁，雌狗为1—1.5岁(第二次发情后)。多在春秋单次发情。银狐犬在日本是极受欢迎的犬种之一，是由白色德国狐狸犬与日本犬杂交改良培育而成。在1952年被正式承认为独立犬种。"
			}
		},
		{
			"score": "0.0",
			"name": "阿拉斯加雪橇犬",
			"baike_info": {
				"image_url": "src/assets/images/user/identifyhistory/1/4.jpg",
				"description": "阿拉斯加雪橇犬(英文名：Alaskan Malamute)也叫阿拉斯加犬、阿拉斯加马拉穆等，原产北美阿拉斯加，是最古老的极地雪橇犬之一。该犬结实、有力、肌肉发达而且胸很深；当它们站立时，头部竖直，眼神显得警惕、好奇，给人的感觉是充满活力而且非常傲娇；头部宽阔，耳朵呈三角形，警惕状态时保持竖立；被毛浓密，披毛有足够的长度以保护内层柔软的底毛；毛色多样，有灰、黑白、红棕等。阿拉斯加雪橇犬忠诚且聪明，同时具有很好的导向性和敏锐的嗅觉，所以原始用途是作为雪橇犬、猎犬。再加上对人友好，易亲近人的性格，较容易驯服的特性，阿拉斯加雪橇犬已经成为了人们的宠物犬、工作犬、伴侣犬。除此之外，该物种天生性格稳重，强壮的身体和出色的运动能力也使得该物种被作为了优秀的警备犬。"
			}
		}
	]
},
{
	"image": "src/assets/images/user/identifyhistory/2/1.jpg",
	"data": [
		{
			"score": "0.858",
			"name": "英国短毛猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E8%8B%B1%E5%9B%BD%E7%9F%AD%E6%AF%9B%E7%8C%AB/672846",
				"image_url": "src/assets/images/user/identifyhistory/2/2.jpg",
				"description": "英国短毛猫是食肉目猫科猫属的哺乳动物。身体中等到大型，胸、肩、臀均宽，肌肉发达；头宽、圆而大，满月脸颊，鼻子短，下巴坚固，和鼻子构成垂线；耳朵大小中等，眼睛大而圆，间距大；尾巴长度为身长的2/3，毛型短而密，质地暗。英国短毛猫是最善于捕猎的猫类之一，被英国人公认为是“捕鼠能手”。英国短毛猫天生爱洁净，好奇心强烈，喜欢夜游，喜爱鸡肉和鱼肉，可选择真空包装的湿性食品或罐头食品饲喂。英国短毛猫举止端庄，任性，独立性较强；善与小孩和狗共同玩耍，是成年人的忠实伴侣；有良好的心理素质，能自如地应付不良环境的影响。英国短毛猫寿命14～20年。英国短毛猫是最古老的猫种之一，家猫育种鼻祖哈里森·威尔单独一人将英国“无主跑街猫”培育成英国短毛猫。于17世纪20年代随移民船到达美国，成为美国短毛猫的培育基础。在19 世纪末期，该猫是英国水晶宫猫展的宠儿，很受青睐。在刘易斯·卡罗尔的童话《爱丽丝漫游奇境》中登场的柴郡猫，便是以英国短毛猫为原型创作的，英国短毛猫也因此名声大噪。目前英国短毛猫已经成为英国第3大纯种猫族群，并且在世界上也广受欢迎。英国短毛猫叫声甜美，喜欢亲近主人，为一种可爱和理想的家庭宠物。"
			}
		},
		{
			"score": "0.038",
			"name": "俄罗斯蓝猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E4%BF%84%E7%BD%97%E6%96%AF%E8%93%9D%E7%8C%AB/643065",
				"image_url": "src/assets/images/user/identifyhistory/2/3.jpg",
				"description": "俄罗斯蓝猫(Russian Blue)，历史上曾被称做阿契安吉蓝猫，曾有过三种不同的名字。最初是阿契安吉蓝猫，直到20世纪40年代才有俄罗斯蓝猫的名字，另外有段时间它则叫做马耳他猫。证据显示，这种猫确实原产于俄罗斯，因为已在俄罗斯寒带地区发现了同种的猫。俄罗斯蓝猫体型细长，大而直立的尖耳朵，脚掌小而圆，走路像是用脚尖在走。身上披着银蓝色光泽的短被毛，配上修长苗条的体型和轻盈的步态，尽显一派猫中的贵族风度。"
			}
		},
		{
			"score": "0.023",
			"name": "短毛猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E7%9F%AD%E6%AF%9B%E7%8C%AB/6221174",
				"image_url": "src/assets/images/user/identifyhistory/2/4.jpg",
				"description": "短毛猫是家养猫，皮毛不长，很短。短毛猫可能有单层皮毛，也可能是双层皮毛。单层皮毛通常由一层纤细的丝绒般毛发形成，紧贴身体，比如暹罗猫,波曼猫；双层皮毛由外层粗长毛发和浓密柔软的绒毛内层组成，比如马恩岛猫,俄罗斯蓝猫。"
			}
		},
		{
			"score": "0.013",
			"name": "卡尔特猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E5%8D%A1%E5%B0%94%E7%89%B9%E7%8C%AB/5814171",
				"image_url": "src/assets/images/user/identifyhistory/2/5.jpg",
				"description": "卡尔特猫又名英国蓝猫。卡尔特猫被毛致密，柔软光滑，酷似水貂皮。各种色调的灰色均可见到，其中浅灰色最受欢迎；体型粗大；肩、胸宽大，颈粗壮，四肢肌肉发达；步态高雅；头圆形，三角形嘴突，直鼻，耳位较高，两颊饱满，上下颌突出，唇呈黑色；圆眼呈金黄色或铜黄色，有的为橘红色；眼神甜蜜、自信、自然；尾巴长而壮，经常托在背上。卡尔特猫是卡尔特派修道士从北非带回卡尔特修道院饲养的猫。它们的毛泛着和僧侣服装同样美丽的光泽，因而得名卡尔特猫。卡尔特猫原产于法国。最理想的饲养环境是一间带地下室或房前空地的大寓所。膳食以肉食为主，加适量米饭和蔬菜；一周可给一次动物杂件；喂食肉类时以大块为佳，因为适当的咀嚼可以促进卡尔特猫典型饱满的双颊的发育。卡尔特猫身体健壮，忍耐力很强。性格温柔，非常乖巧、有教养；易与人亲近，会对饲主表现出它的情爱及献身精神。虽然对陌生人会有戒备心，但不会攻击人，如果你能温柔地对待它，它会很快地与你亲近起来。卡尔特猫作为法国的家猫深受喜爱。但它们一身美丽的毛皮被视为珍品，从而招致捕杀，一度使它们濒临灭绝。二战之后，人们让几乎要消失篮色的卡尔特猫与英国短毛猫交配，繁育出今天的肌肉强健的猫种。卡尔特猫由此获得新生。在欧美，很多饲养者钟爱各国的土著猫。在他们的努力下，卡尔特猫、英国短毛猫、俄罗斯蓝猫等这些美丽的土著猫种血统得以管理，并被小心地保留着。"
			}
		},
		{
			"score": "0.012",
			"name": "欧洲短毛猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E6%AC%A7%E6%B4%B2%E7%9F%AD%E6%AF%9B%E7%8C%AB/386735",
				"image_url": "src/assets/images/user/identifyhistory/2/6.jpg",
				"description": "欧洲短毛猫又称英国短毛猫，是食肉目猫科猫属哺乳动物。起源于欧洲大陆。体型半短身型，但不是十分有棱有角的体型；毛色和毛质繁多，有黑、白、米、红、灰、双毛色等，也有古典虎斑等条纹；体毛短且浓密，目色依体毛而有不同特征；骨架粗、肌肉发达毛型短而浓密，质地脆；胸部宽大，头圆，耳朵小且呈尖圆形，眼睛大；尾稍短粗，四肢短且强健有力；被毛的颜色和花纹有一定的标准，有的具有和野猫相同的大理石花纹和条纹。欧洲短毛猫原产地为欧洲，性格谨慎、敏感，捕猎本领强；生命力顽强、活跃、贪玩；比混血猫更容易相处，更安静，更温柔、感情丰富；对于领地的意识比较强。运动量的改变使欧洲短毛猫肠道的消化吸收能力以及肝、肾的过滤和解毒等功能都会发生变化，应该多加注意猫咪适合的食物硬度，适量补充钙、铁、维生素及其它微量元素，更换不同口味的食物，禁食不易消化的食品，保证清水供给。欧洲短毛猫于1982年成为一个独立猫种，是捕猎能手。其花纹明显而漂亮，深受人们喜爱，也是令人愉快的好伴侣。动物学家指出，这种猫是2000多年前古罗马人将埃及猫带进欧洲后繁殖成的，所以，埃及猫为它们的祖先。"
			}
		},
		{
			"score": "0.011",
			"name": "俄罗斯短毛猫",
			"baike_info": {
				"baike_url": "http://baike.baidu.com/item/%E4%BF%84%E7%BD%97%E6%96%AF%E7%9F%AD%E6%AF%9B%E7%8C%AB/7658539",
				"image_url": "src/assets/images/user/identifyhistory/2/7.jpg",
				"description": "俄罗斯短毛猫中文名：俄罗斯蓝猫、俄国短毛猫、阿契安吉蓝猫、马耳他猫。"
			}
		}
	]
}


]
import { useRouter } from 'vue-router';
const router = useRouter();
const goto = (data) => {
	router.push({ name: 'identificationresult', query: { data: JSON.stringify(data) } });
}

</script>

<style scoped>
.page {
	background-color: #ffffffe6;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	height: 100%;
}

.group {
	padding-bottom: 82px;
	overflow-y: auto;
}

.header {
	padding: 25px 6px 12px;
}



.space-x-16>div:not(:first-child),
.space-x-16>text:not(:first-child),
.space-x-16>image:not(:first-child) {
	margin-left: 17px;
}

.pos {
	position: absolute;
	right: 6px;
	bottom: 12px;
}

.image {
	width: 22px;
	height: 22px;
}

.text_2 {
	color: #000000cc;
	font-size: 17px;
	font-family: SourceHanSansCN;
	line-height: 16px;
}

.group_3 {
	margin: 21px 8px 0;
}

.font_1 {
	font-size: 18px;
	font-family: ali;
	color: #303133;
}

.text_3 {
	margin-left: 8px;
	line-height: 30px;
}

.section {
	background-color: #cccccc;
	border-radius: 10px;
	width: 28vw;
	height: 28vw;
	margin: 6px;
}



.group_4 {
	margin: 29px 8px 0;
}

.text_4 {
	margin-left: 8px;
}

.pos_2 {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
}

.group_5 {
	margin: 29px 8px 0;
}


.text_5 {
	margin-left: 8px;
}

.group_6 {
	margin: 29px 8px 0;
}

.space-y-18>div:not(:first-child),
.space-y-18>text:not(:first-child),
.space-y-18>image:not(:first-child) {
	margin-top: 19px;
}

.text_6 {
	margin-left: 8px;
}

.space-x-8>div:not(:first-child),
.space-x-8>text:not(:first-child),
.space-x-8>image:not(:first-child) {
	margin-left: 8px;
}

.div {
	flex: 1 1 120px;
}

.div_2 {
	flex: 1 1 120px;
}

.div_3 {
	flex: 1 1 120px;
}
</style>
