import { useMemo, useState, type ComponentType } from 'react';
import {  SafeAreaView } from 'react-native-safe-area-context';
import {
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Filter,
  HardHat,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Package,
  Plus,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
  Wrench,
  X,
} from 'lucide-react-native';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

export type RootTabParamList = {
  Home: undefined;
  Marketplace: undefined;
  Properties: undefined;
  Jobs: undefined;
  Profile: undefined;
};

type Section = keyof RootTabParamList;
type ListingKind = 'Marketplace' | 'Property' | 'Job';
type Listing = {
  id: string;
  title: string;
  location: string;
  price: string;
  detail: string;
  kind: ListingKind;
  tone: 'blue' | 'teal' | 'sand' | 'plum' | 'green' | 'gold';
};

const colors = {
  navy: '#0b1d39',
  navySoft: '#1d2d50',
  yellow: '#ffd200',
  yellowDark: '#c39b00',
  canvas: '#edf1f6',
  card: '#ffffff',
  ink: '#1a2640',
  muted: '#718097',
  line: '#e2e7ef',
  purple: '#7653cf',
  blue: '#2e65c6',
  green: '#087f4e',
  red: '#c75963',
};

const categories: {
  label: string;
  icon: IconComponent;
  target: Section;
  tint: string;
}[] = [
  { label: 'Marketplace', icon: Store, target: 'Marketplace', tint: colors.yellowDark },
  { label: 'Properties', icon: Building2, target: 'Properties', tint: colors.blue },
  { label: 'Jobs', icon: BriefcaseBusiness, target: 'Jobs', tint: colors.green },
  { label: 'Services', icon: Wrench, target: 'Marketplace', tint: colors.purple },
  { label: 'Equipment', icon: Package, target: 'Marketplace', tint: '#b55b2d' },
  { label: 'Contractors', icon: HardHat, target: 'Jobs', tint: colors.purple },
  { label: 'Tenders', icon: ClipboardList, target: 'Jobs', tint: '#2d9b84' },
  { label: 'Events', icon: CalendarDays, target: 'Home', tint: colors.red },
];

const marketplaceItems: Listing[] = [
  {
    id: 'm-1',
    title: 'Concrete mixer, 400L',
    location: 'Al Quoz, Dubai',
    price: 'AED 4,800',
    detail: 'Serviced 2024 mixer with delivery available across Dubai.',
    kind: 'Marketplace',
    tone: 'blue',
  },
  {
    id: 'm-2',
    title: 'Scaffolding frames',
    location: 'Industrial Area 3',
    price: 'AED 32 / set',
    detail: 'Heavy-duty frames in excellent condition. Bulk orders welcome.',
    kind: 'Marketplace',
    tone: 'teal',
  },
  {
    id: 'm-3',
    title: 'Porcelain floor tiles',
    location: 'Jebel Ali',
    price: 'AED 38 / m²',
    detail: 'Warm stone finish, 60 × 120 cm, over 600 m² available.',
    kind: 'Marketplace',
    tone: 'sand',
  },
  {
    id: 'm-4',
    title: 'Excavator rental',
    location: 'Sharjah, UAE',
    price: 'AED 650 / day',
    detail: '20-ton excavator with an experienced operator included.',
    kind: 'Marketplace',
    tone: 'plum',
  },
];

const propertyItems: Listing[] = [
  {
    id: 'p-1',
    title: 'Warehouse with yard',
    location: 'Dubai Investment Park',
    price: 'AED 245k / year',
    detail: '12,500 sq ft warehouse with loading bay and a secure yard.',
    kind: 'Property',
    tone: 'green',
  },
  {
    id: 'p-2',
    title: 'Retail shell and core',
    location: 'Meydan, Dubai',
    price: 'AED 1.85m',
    detail: 'Street-facing retail unit in a growing mixed-use community.',
    kind: 'Property',
    tone: 'gold',
  },
  {
    id: 'p-3',
    title: 'Labour accommodation',
    location: 'Muhaisnah 2',
    price: 'AED 92k / year',
    detail: 'Ready accommodation block with 48 rooms and shared facilities.',
    kind: 'Property',
    tone: 'blue',
  },
];

const jobItems: Listing[] = [
  {
    id: 'j-1',
    title: 'Site engineer — fit-out',
    location: 'Dubai Marina',
    price: 'AED 15–18k / month',
    detail: 'Lead site coordination for a premium hospitality fit-out.',
    kind: 'Job',
    tone: 'plum',
  },
  {
    id: 'j-2',
    title: 'MEP quantity surveyor',
    location: 'Abu Dhabi',
    price: 'AED 13–16k / month',
    detail: 'Join a regional contractor delivering complex commercial work.',
    kind: 'Job',
    tone: 'teal',
  },
  {
    id: 'j-3',
    title: 'Formwork carpenter crew',
    location: 'Ras Al Khaimah',
    price: 'Project rate',
    detail: 'Crew required for a 6-month residential development.',
    kind: 'Job',
    tone: 'sand',
  },
];

const tabItems: { label: string; icon: IconComponent; target: Section }[] = [
  { label: 'Home', icon: Home, target: 'Home' },
  { label: 'Marketplace', icon: Store, target: 'Marketplace' },
  { label: 'Properties', icon: Building2, target: 'Properties' },
  { label: 'Jobs', icon: BriefcaseBusiness, target: 'Jobs' },
  { label: 'Profile', icon: UserRound, target: 'Profile' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Section>('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Marketplace':
        return <MarketplaceScreen />;
      case 'Properties':
        return <PropertiesScreen />;
      case 'Jobs':
        return <JobsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appStage}>
      <View style={styles.phoneShell}>
        <View style={styles.appBody}>{renderScreen()}</View>
        <BottomTabBar activeTab={activeTab} onChange={setActiveTab} />
      </View>
    </View>
  );
}

function BottomTabBar({ activeTab, onChange }: { activeTab: Section; onChange: (tab: Section) => void }) {
  return (
    <View testID="bottom-tab-bar" style={styles.tabBar}>
      {tabItems.map(({ label, icon: Icon, target }) => {
        const isActive = activeTab === target;
        return (
          <Pressable key={label} style={styles.tabBarItem} onPress={() => onChange(target)}>
            <View style={[styles.tabIcon, isActive && styles.tabIconActive]}>
              <Icon color={isActive ? colors.navy : '#6d7a90'} size={18} strokeWidth={2.2} />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function SiteTopbar() {
  return (
    <View style={styles.siteTopbar}>
      <View style={styles.siteTopbarInner}>
        <Text style={styles.siteBrand}>AsaaS</Text>
        <Text style={styles.siteBrandSub}>To build a nation</Text>
        <View style={styles.siteNavWrap}>
          <Text style={styles.siteNavItem}>Marketplace</Text>
          <Text style={styles.siteNavItem}>Properties</Text>
          <Text style={styles.siteNavItem}>Jobs</Text>
          <Text style={styles.siteNavItem}>Services</Text>
        </View>
        <View style={styles.siteTopbarActions}>
          <Pressable style={styles.siteSearchButton} accessibilityLabel="Search">
            <Search color={colors.navy} size={14} />
          </Pressable>
          <Pressable style={styles.siteLoginButton}>
            <Text style={styles.siteLoginText}>Log in / Create account</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.siteMetaBar}>
        <Text style={styles.siteMetaText}>Buy: 35.72</Text>
        <Text style={styles.siteMetaText}>Sell: 31.62</Text>
        <Text style={styles.siteMetaText}>USD/TRY: 31.29</Text>
        <Text style={styles.siteMetaText}>USD/SAR: 3.75</Text>
      </View>
    </View>
  );
}

function ScreenHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <View style={styles.brandLockup}>
          <Text style={styles.brandMark}>AsaaS</Text>
          <Text style={styles.brandSub}>THE HUB FOR{'\n'}BUILT ENVIRONMENT</Text>
        </View>
        <Pressable style={styles.headerIcon} accessibilityLabel="Notifications">
          <Bell color={colors.navy} size={17} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerCaption}>{caption}</Text>
    </View>
  );
}

function SearchField({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchField}>
        <Search color={colors.muted} size={17} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ba6b7"
          style={styles.searchInput}
          accessibilityLabel={placeholder}
        />
      </View>
      <Pressable style={styles.filterButton} accessibilityLabel="Open filters">
        <SlidersHorizontal color={colors.navy} size={17} />
      </Pressable>
    </View>
  );
}

function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && onAction ? (
        <Pressable onPress={onAction} style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>{action}</Text>
          <ChevronRight color={colors.yellowDark} size={13} />
        </Pressable>
      ) : null}
    </View>
  );
}

function HomeScreen() {
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const posts = [
    { name: 'Nadia Karim', text: 'Looking for a reliable fit-out crew', tone: 'plum' as const },
    { name: 'Omar BuildCo', text: 'A practical guide to reducing site waste', tone: 'teal' as const },
    { name: 'Maya Properties', text: 'New commercial spaces near the airport', tone: 'sand' as const },
  ];
  const filteredPosts = posts.filter((post) =>
    `${post.name} ${post.text}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Screen>
      <SiteTopbar />
      <ScreenHeader
        title="Good morning, Rami"
        caption="Your pocket hub for building better, together."
      />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Search products, spaces and people"
        />
        <View style={styles.categoryGrid}>
          {categories.map(({ label, icon: Icon, target, tint }) => (
            <Pressable
              key={label}
              style={({ pressed }) => [styles.categoryCard, pressed && styles.pressed]}
              onPress={() => {
                setNotice(target === 'Home' ? 'Events refreshed for your area' : `${label} is ready to explore`);
              }}
            >
              <View style={[styles.categoryIcon, { backgroundColor: `${tint}16` }]}>
                <Icon color={tint} size={18} strokeWidth={2.1} />
              </View>
              <Text style={styles.categoryLabel}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.communityCard}>
            <View style={styles.communityTop}>
              <View style={[styles.avatar, { backgroundColor: '#ede7ff' }]}>
                <UsersRound color={colors.purple} size={16} />
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.communityTitle}>AsaaS Community</Text>
                <Text style={styles.communityMeta}>Ask, share, and find the right people.</Text>
              </View>
              <Text style={styles.communityLive}>LIVE</Text>
            </View>
            <View style={styles.communityRule} />
            <Pressable
              onPress={() => setNotice('Community discussions are ready to explore')}
              style={styles.communityButton}
            >
              <Text style={styles.communityButtonText}>Join community discussions</Text>
              <Arrow color={colors.purple} size={13} />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title="What’s new" action="View all" onAction={() => setNotice('Marketplace is ready to explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalGap}>
            {filteredPosts.map((post) => (
              <Pressable key={post.name} onPress={() => setNotice(`Opened ${post.name}'s community post`)} style={styles.postCard}>
                <View style={[styles.postArt, styles[post.tone]]}>
                  <Text style={styles.postArtLabel}>{post.text}</Text>
                  <View style={styles.postArtLine} />
                </View>
                <View style={styles.postBody}>
                  <Text style={styles.postName}>{post.name}</Text>
                  <Text style={styles.postMeta}>2 hours ago · 4 replies</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeading title="Build momentum" />
          <View style={styles.promoGrid}>
            <PromoCard
              tone="yellow"
              eyebrow="FOR YOUR BUSINESS"
              title="Ready to grow?"
              copy="Put products, crews or equipment in front of the right people."
              button="Create listing"
              onPress={() => setNotice('Marketplace is ready to explore')}
            />
            <PromoCard
              tone="green"
              eyebrow="FIND YOUR NEXT SPACE"
              title="Properties"
              copy="Search for sale or rent, and list your own property."
              button="View properties"
              onPress={() => setNotice('Properties are ready to explore')}
            />
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading title="Recommended for you" action="View all" onAction={() => setNotice('Marketplace is ready to explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalGap}>
            {marketplaceItems.slice(0, 3).map((item) => (
              <ListingCard key={item.id} item={item} onNotify={setNotice} compact />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeading title="Upcoming events" action="View all" onAction={() => setNotice('Events are being curated for your area')} />
          <View style={styles.eventGrid}>
            <Pressable style={styles.eventCard} onPress={() => setNotice('BuildTech supplier morning saved')}>
              <Text style={styles.eventDate}>18 SEP · DUBAI</Text>
              <Text style={styles.eventTitle}>BuildTech supplier morning</Text>
              <Text style={styles.eventCopy}>Meet 24 local suppliers.</Text>
            </Pressable>
            <Pressable style={styles.eventCard} onPress={() => setNotice('Property networking table saved')}>
              <Text style={styles.eventDate}>04 OCT · ABU DHABI</Text>
              <Text style={styles.eventTitle}>Property networking table</Text>
              <Text style={styles.eventCopy}>Curated introductions.</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Footer />
      {notice ? <Notice message={notice} onDismiss={() => setNotice('')} /> : null}
    </Screen>
  );
}

function BrowseScreen({
  kind,
  title,
  caption,
  items,
}: {
  kind: ListingKind;
  title: string;
  caption: string;
  items: Listing[];
}) {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [localItems, setLocalItems] = useState(items);
  const [selected, setSelected] = useState<Listing | null>(null);
  const [notice, setNotice] = useState('');
  const [creating, setCreating] = useState(false);
  const chips =
    kind === 'Marketplace'
      ? ['All', 'Materials', 'Equipment', 'Services']
      : kind === 'Property'
        ? ['All', 'For rent', 'For sale', 'Commercial']
        : ['All', 'Full-time', 'Contract', 'Crews'];
  const filtered = useMemo(
    () =>
      localItems.filter((item) => {
        const queryMatch = `${item.title} ${item.location} ${item.detail}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const chipMatch =
          activeChip === 'All' ||
          item.detail.toLowerCase().includes(activeChip.toLowerCase()) ||
          (activeChip === 'Commercial' && item.kind === 'Property') ||
          (activeChip === 'Crews' && item.title.toLowerCase().includes('crew'));
        return queryMatch && chipMatch;
      }),
    [activeChip, localItems, search],
  );

  return (
    <Screen>
      <ScreenHeader title={title} caption={caption} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.browseToolbar}>
          <View style={styles.flexOne}>
            <Text style={styles.browseTitle}>
              {kind === 'Marketplace'
                ? 'Find what moves work'
                : kind === 'Property'
                  ? 'Space for the next move'
                  : 'People behind the projects'}
            </Text>
            <Text style={styles.browseSubtitle}>{filtered.length} verified listings</Text>
          </View>
          <Pressable style={styles.primaryButton} onPress={() => setCreating(true)}>
            <Plus color={colors.navy} size={15} strokeWidth={2.6} />
            <Text style={styles.primaryButtonText}>List</Text>
          </Pressable>
        </View>
        <SearchField value={search} onChangeText={setSearch} placeholder={`Search ${kind.toLowerCase()}...`} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipGap}>
          {chips.map((chip) => (
            <Pressable
              key={chip}
              style={[styles.chip, activeChip === chip && styles.chipActive]}
              onPress={() => setActiveChip(chip)}
            >
              <Text style={[styles.chipText, activeChip === chip && styles.chipTextActive]}>{chip}</Text>
            </Pressable>
          ))}
          <Pressable style={styles.chip} onPress={() => setNotice('More filters are ready for your preferences')}>
            <Filter color={colors.navy} size={12} />
            <Text style={styles.chipText}>More</Text>
          </Pressable>
        </ScrollView>

        {filtered.length ? (
          <View style={styles.stack}>
            {filtered.map((item) => (
              <ListingCard key={item.id} item={item} onNotify={setNotice} onPress={() => setSelected(item)} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <ListFilterIcon />
            <Text style={styles.emptyTitle}>No listings found</Text>
            <Text style={styles.emptyCopy}>Change your search or filters to see more local results.</Text>
            <Pressable
              style={styles.outlineButton}
              onPress={() => {
                setSearch('');
                setActiveChip('All');
              }}
            >
              <Text style={styles.outlineButtonText}>Reset filters</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      {notice ? <Notice message={notice} onDismiss={() => setNotice('')} /> : null}
      {selected ? <ListingDetail item={selected} onClose={() => setSelected(null)} onNotify={setNotice} /> : null}
      {creating ? (
        <CreateListing
          kind={kind}
          onClose={() => setCreating(false)}
          onCreated={(item) => {
            setLocalItems((current) => [item, ...current]);
            setCreating(false);
            setNotice('Your listing is live in the community');
          }}
        />
      ) : null}
    </Screen>
  );
}

function ProfileScreen() {
  const [notice, setNotice] = useState('');
  const [available, setAvailable] = useState(true);
  const rows: { icon: IconComponent; label: string; value?: string }[] = [
    { icon: Heart, label: 'Saved listings', value: '12' },
    { icon: ClipboardList, label: 'My listings', value: '4 active' },
    { icon: MessageCircle, label: 'Messages', value: '3 unread' },
    { icon: Settings, label: 'Account settings' },
    { icon: CircleHelp, label: 'Help and feedback' },
  ];
  return (
    <Screen>
      <ScreenHeader title="Your profile" caption="Keep your professional presence current." />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHero}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>RM</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.profileName}>Rami Mansour</Text>
            <Text style={styles.profileMeta}>Project director · Dubai, UAE</Text>
          </View>
          <Pressable style={styles.headerIcon} onPress={() => setNotice('Profile editor opened')}>
            <ChevronRight color={colors.navy} size={16} />
          </Pressable>
        </View>
        <View style={styles.section}>
          <SectionHeading title="Your availability" />
          <Pressable
            style={styles.profileRow}
            onPress={() => {
              setAvailable((value) => !value);
              setNotice(available ? 'You are now marked unavailable' : 'You are now open to opportunities');
            }}
          >
            <Sparkles color={colors.purple} size={17} />
            <Text style={styles.profileRowLabel}>{available ? 'Open to new opportunities' : 'Not looking right now'}</Text>
            <Text style={[styles.statusPill, !available && styles.statusPillOff]}>{available ? 'ON' : 'OFF'}</Text>
            <ChevronRight color={colors.muted} size={15} />
          </Pressable>
        </View>
        <View style={styles.section}>
          <SectionHeading title="Workspace" />
          <View style={styles.profileList}>
            {rows.map(({ icon: Icon, label, value }) => (
              <Pressable key={label} style={styles.profileRow} onPress={() => setNotice(`${label} opened`)}>
                <Icon color={colors.purple} size={17} />
                <Text style={styles.profileRowLabel}>{label}</Text>
                {value ? <Text style={styles.profileRowValue}>{value}</Text> : null}
                <ChevronRight color={colors.muted} size={15} />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.scoreCard}>
            <View style={styles.communityTop}>
              <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,.15)' }]}>
                <Check color={colors.yellow} size={16} />
              </View>
              <View style={styles.flexOne}>
                <Text style={styles.scoreTitle}>Your community score</Text>
                <Text style={styles.scoreCopy}>Complete your profile to build trust.</Text>
              </View>
              <Text style={styles.scoreValue}>72%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>
        </View>
      </ScrollView>
      {notice ? <Notice message={notice} onDismiss={() => setNotice('')} /> : null}
    </Screen>
  );
}

function ListingCard({
  item,
  onNotify,
  onPress,
  compact = false,
}: {
  item: Listing;
  onNotify: (message: string) => void;
  onPress?: () => void;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.listingCard, compact && styles.listingCardCompact, pressed && styles.pressed]}
    >
      <ListingVisual item={item} compact={compact} />
      <View style={styles.listingInfo}>
        <Text numberOfLines={2} style={styles.listingTitle}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.listingLocation}>{item.location}</Text>
        <Text style={styles.listingPrice}>{item.price}</Text>
        <View style={styles.listingMeta}>
          <MapPin color={colors.muted} size={11} />
          <Text style={styles.listingMetaText}>Verified listing</Text>
          {!compact ? <ChevronRight color={colors.muted} size={12} /> : null}
        </View>
      </View>
      <Pressable
        onPress={() => {
          setSaved((value) => !value);
          onNotify(saved ? 'Removed from your saved list' : 'Saved to your shortlist');
        }}
        style={styles.saveButton}
        accessibilityLabel={saved ? 'Remove saved listing' : 'Save listing'}
      >
        <Heart color={saved ? colors.yellowDark : colors.muted} fill={saved ? colors.yellow : 'transparent'} size={15} />
      </Pressable>
    </Pressable>
  );
}

function ListingVisual({ item, compact }: { item: Listing; compact: boolean }) {
  const toneColor = {
    blue: '#2b5ba7',
    teal: '#167f77',
    sand: '#b58b63',
    plum: '#6c4aa2',
    green: '#247b5c',
    gold: '#b17d2c',
  }[item.tone];
  return (
    <View style={[styles.listingVisual, compact && styles.listingVisualCompact, { backgroundColor: toneColor }]}>
      <View style={[styles.visualOrb, { backgroundColor: 'rgba(255,255,255,.18)' }]} />
      <View style={[styles.visualOrbSmall, { backgroundColor: 'rgba(255,255,255,.20)' }]} />
      <View style={styles.listingBadge}>
        <Text style={styles.listingBadgeText}>{item.kind}</Text>
      </View>
      <Text style={styles.visualInitials}>{item.kind === 'Property' ? 'PROP' : item.kind === 'Job' ? 'WORK' : 'BUILD'}</Text>
    </View>
  );
}

function ListingDetail({
  item,
  onClose,
  onNotify,
}: {
  item: Listing;
  onClose: () => void;
  onNotify: (message: string) => void;
}) {
  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Listing details</Text>
            <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="Close details">
              <X color={colors.navy} size={17} />
            </Pressable>
          </View>
          <ListingVisual item={item} compact={false} />
          <Text style={styles.detailTitle}>{item.title}</Text>
          <View style={styles.detailLocation}>
            <MapPin color={colors.purple} size={14} />
            <Text style={styles.detailLocationText}>{item.location}</Text>
          </View>
          <Text style={styles.detailPrice}>{item.price}</Text>
          <Text style={styles.detailCopy}>{item.detail}</Text>
          <View style={styles.modalActions}>
            <Pressable style={styles.outlineButton} onPress={() => onNotify('Share link copied to your clipboard')}>
              <Share2 color={colors.navy} size={14} />
              <Text style={styles.outlineButtonText}>Share</Text>
            </Pressable>
            <Pressable style={styles.primaryButtonLarge} onPress={() => onNotify('Message started with the lister')}>
              <MessageCircle color={colors.navy} size={14} />
              <Text style={styles.primaryButtonText}>Contact lister</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function CreateListing({
  kind,
  onClose,
  onCreated,
}: {
  kind: ListingKind;
  onClose: () => void;
  onCreated: (item: Listing) => void;
}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const valid = Boolean(title.trim() && location.trim() && price.trim());
  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView style={styles.modalBackdrop} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <ScrollView contentContainerStyle={styles.modalScroll}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create a {kind.toLowerCase()} listing</Text>
              <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="Close create form">
                <X color={colors.navy} size={17} />
              </Pressable>
            </View>
            <FormField label="Title" value={title} onChangeText={setTitle} placeholder={kind === 'Job' ? 'e.g. Senior site supervisor' : 'e.g. Ready-mix concrete supply'} />
            <FormField label="Location" value={location} onChangeText={setLocation} placeholder="City or area" />
            <FormField label="Price or rate" value={price} onChangeText={setPrice} placeholder="e.g. AED 2,500 / month" />
            <FormField label="Short description" value={detail} onChangeText={setDetail} placeholder="Add the details professionals need to know" multiline />
            <View style={styles.modalActions}>
              <Pressable style={styles.outlineButton} onPress={onClose}>
                <Text style={styles.outlineButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                disabled={!valid}
                style={[styles.primaryButtonLarge, !valid && styles.primaryButtonDisabled]}
                onPress={() =>
                  onCreated({
                    id: `local-${Date.now()}`,
                    title: title.trim(),
                    location: location.trim(),
                    price: price.trim(),
                    detail: detail.trim() || 'New listing from the AsaaS community.',
                    kind,
                    tone: 'teal',
                  })
                }
              >
                <Plus color={colors.navy} size={14} />
                <Text style={styles.primaryButtonText}>Publish listing</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.formField}>
      <Text style={styles.formLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ba6b7"
        multiline={multiline}
        style={[styles.formInput, multiline && styles.formInputMultiline]}
      />
    </View>
  );
}

function PromoCard({
  tone,
  eyebrow,
  title,
  copy,
  button,
  onPress,
}: {
  tone: 'yellow' | 'green';
  eyebrow: string;
  title: string;
  copy: string;
  button: string;
  onPress: () => void;
}) {
  return (
    <View style={[styles.promoCard, tone === 'yellow' ? styles.promoYellow : styles.promoGreen]}>
      <Text style={styles.promoEyebrow}>{eyebrow}</Text>
      <Text style={styles.promoTitle}>{title}</Text>
      <Text style={styles.promoCopy}>{copy}</Text>
      <Pressable style={styles.promoButton} onPress={onPress}>
        {tone === 'yellow' ? <Plus color="#fff" size={12} /> : <Arrow color={colors.green} size={12} />}
        <Text style={[styles.promoButtonText, tone === 'yellow' && styles.promoButtonTextDark]}>{button}</Text>
      </Pressable>
      <View style={styles.promoDecoration} />
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footerShell}>
      <View style={styles.footerGrid}>
        <View style={styles.footerColumn}>
          <Text style={styles.footerBrand}>AsaaS</Text>
          <Text style={styles.footerText}>A comprehensive platform connecting construction professionals, providers, and suppliers.</Text>
          <Text style={styles.footerText}>+971 52 792 3424</Text>
          <Text style={styles.footerText}>support@asaas.services</Text>
        </View>
        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Quick Links</Text>
          {['Home', 'Marketplace', 'Properties', 'Jobs', 'Engineering Services', 'Equipment', 'Tenders', 'Contractors'].map((link) => (
            <Text key={link} style={styles.footerLink}>{link}</Text>
          ))}
        </View>
        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Support</Text>
          {['Help Center', 'Contact Us', 'FAQ', 'Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((link) => (
            <Text key={link} style={styles.footerLink}>{link}</Text>
          ))}
        </View>
        <View style={styles.footerColumn}>
          <Text style={styles.footerHeading}>Stay Connected</Text>
          <View style={styles.subscribeRow}>
            <TextInput placeholder="Enter your email" placeholderTextColor="#8c99af" style={styles.subscribeInput} />
            <Pressable style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.footerBottom}>
        <Text style={styles.footerBottomText}>© 2025 AsaaS. All rights reserved.</Text>
        <View style={styles.footerBottomMeta}>
          <Text style={styles.footerBottomText}>Terms</Text>
          <Text style={styles.footerBottomText}>Privacy</Text>
          <Text style={styles.footerBottomText}>Cookies</Text>
        </View>
      </View>
    </View>
  );
}

function Notice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <View style={styles.notice} accessibilityLiveRegion="polite">
      <Check color={colors.yellow} size={16} />
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable onPress={onDismiss} accessibilityLabel="Dismiss notice">
        <X color="#fff" size={15} />
      </Pressable>
    </View>
  );
}

function Screen({ children }: { children: React.ReactNode }) {
  return <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>{children}</SafeAreaView>;
}

function Arrow({ color, size }: { color: string; size: number }) {
  return <ChevronRight color={color} size={size} />;
}

function ListFilterIcon() {
  return <Filter color={colors.purple} size={26} />;
}

function MarketplaceScreen() {
  return <BrowseScreen kind="Marketplace" items={marketplaceItems} title="Marketplace" caption="Materials, equipment, services and more." />;
}

function PropertiesScreen() {
  return <BrowseScreen kind="Property" items={propertyItems} title="Properties" caption="Find a space that fits the next phase." />;
}

function JobsScreen() {
  return <BrowseScreen kind="Job" items={jobItems} title="Jobs" caption="Good work starts with the right people." />;
}

const styles = StyleSheet.create({
  appStage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfe6ee',
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: '100vh',
  },
  phoneShell: {
    flex: 1,
    width: 430,
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'calc(100vh - 16px)',
    overflow: 'hidden',
    backgroundColor: colors.canvas,
    flexDirection: 'column',
    shadowColor: '#17233b',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  appBody: { flex: 1, minHeight: 0, overflow: 'hidden', backgroundColor: colors.canvas },
  screen: { flex: 1, backgroundColor: colors.canvas },
  siteTopbar: {
    backgroundColor: '#0e1d3a',
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  siteTopbarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 16,
    flexWrap: 'wrap',
    minWidth: 0,
  },
  siteBrand: {
    color: '#f7d441',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1.1,
    fontStyle: 'italic',
    flexShrink: 1,
  },
  siteBrandSub: {
    color: '#dfe6f4',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginRight: 'auto',
    opacity: 0.8,
  },
  siteNavWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
    marginHorizontal: 10,
    minWidth: 0,
    flexShrink: 1,
  },
  siteNavItem: {
    color: '#edf2ff',
    fontSize: 10,
    fontWeight: '700',
    opacity: 0.9,
  },
  siteTopbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  siteSearchButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f7d441',
    alignItems: 'center',
    justifyContent: 'center',
  },
  siteLoginButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: '#f5d443',
  },
  siteLoginText: {
    color: '#0b1d39',
    fontSize: 9.5,
    fontWeight: '800',
  },
  siteMetaBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    paddingTop: 8,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  siteMetaText: {
    color: '#e7edf9',
    fontSize: 8.5,
    opacity: 0.84,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandMark: { color: colors.yellowDark, fontSize: 25, lineHeight: 28, fontWeight: '900', fontStyle: 'italic', letterSpacing: -1.4 },
  brandSub: { color: colors.muted, fontSize: 7, lineHeight: 9, letterSpacing: 1.1, fontWeight: '800' },
  headerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f4f6fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: { position: 'absolute', top: 7, right: 7, width: 5, height: 5, borderRadius: 3, backgroundColor: colors.yellow },
  headerTitle: { marginTop: 15, color: colors.navy, fontSize: 22, fontWeight: '800', letterSpacing: -0.7 },
  headerCaption: { color: colors.muted, fontSize: 11, marginTop: 3 },
  scrollContent: { padding: 15, paddingBottom: 24 },
  searchRow: { flexDirection: 'row', gap: 9, marginBottom: 16 },
  searchField: {
    height: 42,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 11,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: { flex: 1, color: colors.ink, fontSize: 12, paddingVertical: 0, outlineStyle: 'none' as never },
  filterButton: { width: 42, height: 42, borderRadius: 11, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryCard: {
    width: '23.7%',
    minHeight: 91,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
    minWidth: 0,
  },
  categoryIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 7 },
  categoryLabel: { color: colors.ink, fontSize: 9.5, fontWeight: '700', textAlign: 'center' },
  section: { marginTop: 20 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 },
  sectionTitle: { color: colors.navy, fontSize: 14, fontWeight: '800', letterSpacing: -0.15 },
  sectionAction: { flexDirection: 'row', alignItems: 'center', gap: 1 },
  sectionActionText: { color: colors.yellowDark, fontSize: 10, fontWeight: '800' },
  communityCard: { padding: 14, borderRadius: 15, backgroundColor: colors.navy },
  communityTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  flexOne: { flex: 1 },
  communityTitle: { color: '#fff', fontSize: 13, fontWeight: '800' },
  communityMeta: { color: '#aeb9ce', fontSize: 10, marginTop: 3 },
  communityLive: { color: colors.yellow, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  communityRule: { height: 1, backgroundColor: 'rgba(255,255,255,.12)', marginVertical: 13 },
  communityButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3, paddingVertical: 7, borderRadius: 8, backgroundColor: 'rgba(118,83,207,.22)' },
  communityButtonText: { color: '#d7caff', fontSize: 10, fontWeight: '800' },
  horizontalGap: { gap: 10 },
  postCard: { width: 185, borderRadius: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  postArt: { height: 72, padding: 9, justifyContent: 'flex-end', overflow: 'hidden', borderTopLeftRadius: 13, borderTopRightRadius: 13 },
  postArtLabel: { color: '#fff', fontSize: 11, lineHeight: 14, fontWeight: '800', maxWidth: 140 },
  postArtLine: { position: 'absolute', width: 100, height: 100, borderRadius: 50, right: -28, top: -24, borderWidth: 12, borderColor: 'rgba(255,255,255,.10)' },
  postBody: { padding: 9 },
  postName: { color: colors.ink, fontSize: 10, fontWeight: '800' },
  postMeta: { color: colors.muted, fontSize: 8.5, marginTop: 3 },
  plum: { backgroundColor: '#6951aa' },
  teal: { backgroundColor: '#237d77' },
  sand: { backgroundColor: '#ae8060' },
  promoGrid: { flexDirection: 'row', gap: 10 },
  promoCard: { flex: 1, minHeight: 155, padding: 14, borderRadius: 14, overflow: 'hidden' },
  promoYellow: { backgroundColor: colors.yellow },
  promoGreen: { backgroundColor: colors.green },
  promoEyebrow: { color: 'rgba(11,29,57,.65)', fontSize: 8, fontWeight: '900', letterSpacing: 1, marginBottom: 10 },
  promoTitle: { color: colors.navy, fontSize: 17, fontWeight: '900', letterSpacing: -0.5 },
  promoCopy: { color: 'rgba(11,29,57,.72)', fontSize: 9.5, lineHeight: 14, marginTop: 5, maxWidth: 165 },
  promoButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 5, marginTop: 15, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 7, backgroundColor: colors.navy },
  promoButtonText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  promoButtonTextDark: { color: '#fff' },
  promoDecoration: { position: 'absolute', width: 84, height: 84, borderRadius: 42, right: -24, bottom: -28, borderWidth: 13, borderColor: 'rgba(255,255,255,.16)' },
  eventGrid: { flexDirection: 'row', gap: 10 },
  eventCard: { flex: 1, padding: 13, minHeight: 112, borderRadius: 13, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  eventDate: { color: colors.purple, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  eventTitle: { color: colors.ink, fontSize: 11, lineHeight: 15, fontWeight: '800', marginTop: 12 },
  eventCopy: { color: colors.muted, fontSize: 9, marginTop: 4 },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingTop: 4,
    paddingBottom: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: colors.line,
    shadowColor: '#0d1f3d',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
    overflow: 'hidden',
    marginTop: 0,
  },
  tabBarItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2, minWidth: 0 },
  tabLabel: { fontSize: 8.5, fontWeight: '800', marginTop: 2, color: '#6d7a90' },
  tabLabelActive: { color: colors.navy },
  tabIcon: { width: 32, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 9 },
  tabIconActive: { backgroundColor: '#fff7c7' },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  browseToolbar: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  browseTitle: { color: colors.navy, fontSize: 17, lineHeight: 21, fontWeight: '900', letterSpacing: -0.4 },
  browseSubtitle: { color: colors.muted, fontSize: 10, marginTop: 4 },
  primaryButton: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 9, backgroundColor: colors.yellow },
  primaryButtonLarge: { flex: 1, minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 14, borderRadius: 9, backgroundColor: colors.yellow },
  primaryButtonText: { color: colors.navy, fontSize: 10, fontWeight: '900' },
  primaryButtonDisabled: { opacity: 0.45 },
  chipGap: { gap: 7, paddingBottom: 2 },
  chip: { minHeight: 29, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 11, borderRadius: 99, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { color: colors.navy, fontSize: 10, fontWeight: '800' },
  chipTextActive: { color: '#fff' },
  stack: { gap: 11, marginTop: 16 },
  listingCard: { position: 'relative', flexDirection: 'row', minHeight: 118, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, overflow: 'hidden', minWidth: 0 },
  listingCardCompact: { width: 164, display: 'flex' as never, flexDirection: 'column', minHeight: 218 },
  listingVisual: { position: 'relative', width: 116, minHeight: 104, overflow: 'hidden', borderTopLeftRadius: 14, borderBottomLeftRadius: 14 },
  listingVisualCompact: { width: '100%', height: 92, minHeight: 92, borderTopLeftRadius: 14, borderTopRightRadius: 14, borderBottomLeftRadius: 0 },
  visualOrb: { position: 'absolute', width: 100, height: 100, borderRadius: 50, top: -24, right: -22, borderWidth: 10, borderColor: 'rgba(255,255,255,.10)' },
  visualOrbSmall: { position: 'absolute', width: 48, height: 48, borderRadius: 24, bottom: -12, left: 18 },
  listingBadge: { position: 'absolute', left: 9, top: 9, paddingHorizontal: 7, paddingVertical: 4, borderRadius: 5, backgroundColor: 'rgba(9,25,51,.62)' },
  listingBadgeText: { color: '#fff', fontSize: 7, fontWeight: '900', letterSpacing: 0.6 },
  visualInitials: { position: 'absolute', right: 9, bottom: 9, color: 'rgba(255,255,255,.65)', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  listingInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  listingTitle: { color: colors.ink, fontSize: 12, lineHeight: 16, fontWeight: '900', paddingRight: 16 },
  listingLocation: { color: colors.muted, fontSize: 9.5, marginTop: 5 },
  listingPrice: { color: colors.yellowDark, fontSize: 12, fontWeight: '900', marginTop: 8 },
  listingMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  listingMetaText: { color: colors.muted, fontSize: 8.5, flex: 1 },
  saveButton: { position: 'absolute', right: 8, top: 8, width: 25, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: 'rgba(255,255,255,.85)' },
  emptyState: { alignItems: 'center', marginTop: 30, padding: 24, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line },
  emptyTitle: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 10 },
  emptyCopy: { maxWidth: 230, color: colors.muted, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 5 },
  outlineButton: { minHeight: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: 15, borderRadius: 9, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  outlineButtonText: { color: colors.navy, fontSize: 10, fontWeight: '900' },
  profileHero: { flexDirection: 'row', alignItems: 'center', gap: 11, padding: 14, borderRadius: 15, backgroundColor: colors.navy },
  profileAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.yellow },
  profileAvatarText: { color: colors.navy, fontSize: 14, fontWeight: '900' },
  profileName: { color: '#fff', fontSize: 14, fontWeight: '900' },
  profileMeta: { color: '#aeb9ce', fontSize: 10, marginTop: 4 },
  profileList: { overflow: 'hidden', borderRadius: 13, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card },
  profileRow: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 13, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.line },
  profileRowLabel: { flex: 1, color: colors.ink, fontSize: 11, fontWeight: '800' },
  profileRowValue: { color: colors.muted, fontSize: 10, marginRight: 2 },
  statusPill: { color: colors.green, fontSize: 9, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 99, backgroundColor: '#e0f5eb' },
  statusPillOff: { color: colors.muted, backgroundColor: '#eef1f5' },
  scoreCard: { padding: 15, borderRadius: 14, backgroundColor: colors.purple },
  scoreTitle: { color: '#fff', fontSize: 13, fontWeight: '900' },
  scoreCopy: { color: '#e2d9ff', fontSize: 10, marginTop: 3 },
  scoreValue: { color: colors.yellow, fontSize: 14, fontWeight: '900' },
  progressTrack: { height: 6, marginTop: 15, borderRadius: 99, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,.18)' },
  progressFill: { width: '72%', height: '100%', borderRadius: 99, backgroundColor: colors.yellow },
  notice: { position: 'absolute', left: 15, right: 15, bottom: 78, zIndex: 50, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 13, paddingVertical: 11, borderRadius: 11, backgroundColor: colors.navySoft, shadowColor: '#101b34', shadowOpacity: 0.25, shadowRadius: 16, shadowOffset: { width: 0, height: 7 }, elevation: 6 },
  noticeText: { flex: 1, color: '#fff', fontSize: 10.5, lineHeight: 15 },
  footerShell: {
    backgroundColor: '#112b4a',
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 4,
    marginTop: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  footerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'flex-start',
  },
  footerColumn: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  footerBrand: {
    color: '#f7d441',
    fontSize: 22,
    fontStyle: 'italic',
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 2,
  },
  footerHeading: {
    color: '#f9fbff',
    fontSize: 10.5,
    fontWeight: '800',
    marginBottom: 2,
  },
  footerText: {
    color: '#c8d1e4',
    fontSize: 9,
    lineHeight: 14,
  },
  footerLink: {
    color: '#dfe7f5',
    fontSize: 9,
    lineHeight: 17,
  },
  subscribeRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
    minWidth: 0,
    alignItems: 'center',
  },
  subscribeInput: {
    flex: 1,
    minHeight: 30,
    borderRadius: 7,
    paddingHorizontal: 10,
    backgroundColor: '#eff4fb',
    color: '#1a2540',
    fontSize: 9,
    minWidth: 0,
  },
  subscribeButton: {
    minWidth: 78,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#f7d441',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  subscribeButtonText: {
    color: '#0d1f3d',
    fontSize: 9,
    fontWeight: '800',
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  footerBottomMeta: {
    flexDirection: 'row',
    gap: 10,
  },
  footerBottomText: {
    color: '#d2dae8',
    fontSize: 8,
  },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(11,29,57,.48)' },
  modalScroll: { flexGrow: 1, justifyContent: 'flex-end' },
  modalCard: { padding: 17, borderTopLeftRadius: 21, borderTopRightRadius: 21, backgroundColor: colors.card },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  modalTitle: { flex: 1, color: colors.navy, fontSize: 16, fontWeight: '900' },
  closeButton: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f4f8' },
  detailTitle: { color: colors.navy, fontSize: 18, lineHeight: 23, fontWeight: '900', marginTop: 15 },
  detailLocation: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 },
  detailLocationText: { color: colors.muted, fontSize: 10 },
  detailPrice: { color: colors.yellowDark, fontSize: 15, fontWeight: '900', marginTop: 14 },
  detailCopy: { color: colors.muted, fontSize: 11, lineHeight: 17, marginTop: 8 },
  modalActions: { flexDirection: 'row', gap: 9, marginTop: 18 },
  formField: { marginBottom: 13 },
  formLabel: { color: colors.navy, fontSize: 10, fontWeight: '900', marginBottom: 6 },
  formInput: { minHeight: 42, paddingHorizontal: 11, paddingVertical: 9, borderRadius: 9, borderWidth: 1, borderColor: colors.line, color: colors.ink, fontSize: 11, backgroundColor: '#fbfcfe' },
  formInputMultiline: { minHeight: 76, textAlignVertical: 'top' },
});

export default App;